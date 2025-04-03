const { Pinecone } = require("@pinecone-database/pinecone");
const { HfInference } = require("@huggingface/inference");

const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
});

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);
const index = pc.index("job-listings");

const createEmbedding = async(text) => {
    const embedding = await hf.featureExtraction({
        model: "sentence-transformers/all-MiniLM-L6-v2",
        inputs: text
    });
    return embedding;
}

exports.classifyIntent = async(text) => {
    const response = await hf.zeroShotClassification({
        model: "facebook/bart-large-mnli",
        inputs: text,
        parameters: {
            candidate_labels: ['Coding and Development Jobs', 'Salutations', 'Other'],
        },
    });
    return response[0].labels[0];
};

exports.retrieveVectors = async (query) => {   
    const index = pc.index("job-listings");
    
    const embedding = await createEmbedding(query);

    const queryResponse = await index.query({
        vector: embedding,
        topK: 15,
        includeValues: true,
        includeMetadata: true,
    });

    return queryResponse.matches;
};

exports.getSimilarity = async (resumeData) => {   
    const index = pc.index("job-listings");
    const embedding = await createEmbedding(resumeData);

    const queryResponse = await index.query({
        vector: embedding,
        topK: 1,
        includeValues: true,
        includeMetadata: true,
    });

    return {score: queryResponse.matches[0].score, description: queryResponse.matches[0]}
};

exports.addData = async(jobId, jobDescription, title) => {
    const embedding = await createEmbedding(jobDescription);
     const records = [
        {
            id: jobId,
            values: embedding,
            metadata: {
                title: title,
                description: jobDescription
            }
        }
    ];

    try {
        const upsertResponse = await index.upsert(records);
        console.log("Upsert successful:", upsertResponse);
    } catch (error) {
        console.error("Error during upsert:", error);
    }

    console.log(`Job ${jobId} has been inserted into Pinecone.`);
};

exports.deleteData = async(id) => {
    try {
        const deleteResponse = await index.delete(id);
        console.log("Delete successful:", deleteResponse);
    } catch (error) {
        console.error("Error during delete:", error);
    }
}
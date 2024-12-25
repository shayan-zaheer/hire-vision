const { Pinecone } = require("@pinecone-database/pinecone");
const { HfInference } = require("@huggingface/inference");

exports.retrieveVectors = async (query) => {
    const pc = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY,
    });

    const index = pc.index("job-listings");
    const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

    const embedding = await hf.featureExtraction({
        model: "sentence-transformers/all-MiniLM-L6-v2",
        inputs: query,
    });

    const queryResponse = await index.query({
        vector: embedding,
        topK: 3,
        includeValues: true,
        includeMetadata: true,
    });

    return queryResponse.matches;
};

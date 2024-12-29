const { addData, deleteData } = require("../utils/pinecone")

exports.addEmbedding = async(request, response) => {
    try{
        const {jobId, jobDescription} = request.body;
        addData(jobId, jobDescription);

        return response.status(201).json({
            status: "success"
        })
    } catch(err){
        return response.status(400).json({
            status: "failure",
            message: err.message
        });
    }
};

exports.deleteEmbedding = async(request, response) => {
    try {
        const {id} = request.params;
        deleteData(id);

        return response.status(204);
    } catch (error) {
        return response.status(400).json({
            status: "failure",
            message: err.message
        });
    }
};
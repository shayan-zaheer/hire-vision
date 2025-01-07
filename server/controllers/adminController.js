const Job = require("../models/job");
const { addData, deleteData } = require("../utils/pinecone");
const { cleanJobDescription } = require("../utils/shortfuncs");

exports.addEmbedding = async(request, response) => {
    try{
        let userId = request?.user?._id;
        let {jobId, jobDescription, title} = request.body;
        jobDescription = cleanJobDescription(jobDescription);
        addData(jobId, jobDescription, title);

        await Job.create({title, description: jobDescription, postedBy: userId});

        return response.status(201).json({
            status: "success"
        })
    } catch(err){
        console.error(err);
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

exports.getAllJobs = async(request, response) => {
    try{
        const jobs = await Job.find({postedBy: request?.user?._id});
        return response.status(200).json({
            status: "success",
            jobs
        });
    } catch(err){
        console.error(err);
        return response.status(400).json({
            status: "failure",
            message: err.message
        });
    }
}
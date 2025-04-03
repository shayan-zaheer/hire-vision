const Job = require("../models/job");
const Applicant = require("../models/applicant");
const { addData, deleteData } = require("../../shared-utils/pinecone");
const { cleanJobDescription } = require("../../shared-utils/shortfuncs");
const sendEmail = require("../utils/email");

exports.addEmbedding = async (request, response) => {
    try {
        let userId = request?.user?._id;
        let { jobId, jobDescription, title } = request.body;
        jobDescription = cleanJobDescription(jobDescription);
        addData(jobId, jobDescription, title);

        await Job.create({
            title,
            description: jobDescription,
            postedBy: userId,
        });

        return response.status(201).json({
            status: "success",
        });
    } catch (err) {
        console.error(err);
        return response.status(400).json({
            status: "failure",
            message: err.message,
        });
    }
};

exports.deleteEmbedding = async (request, response) => {
    try {
        const { id } = request.params;
        deleteData(id);

        return response.status(204);
    } catch (error) {
        return response.status(400).json({
            status: "failure",
            message: err.message,
        });
    }
};

exports.getAllJobs = async (request, response) => {
    try {
        const jobs = await Job.find({ postedBy: request?.user?._id });
        return response.status(200).json({
            status: "success",
            jobs,
        });
    } catch (err) {
        console.error(err);
        return response.status(400).json({
            status: "failure",
            message: err.message,
        });
    }
};

exports.getApplicants = async (request, response) => {
    try {
        const applicants = await Applicant.find().populate({
            path: "job",
            select: "title",
        });

        if (!applicants) {
            return response.status(404).json({
                status: "failure",
                message: "Applicants not found!",
            });
        }

        return response.status(200).json({
            status: "success",
            applicants,
        });
    } catch (err) {
        console.error(err);
        return response.status(500).json({
            status: "failure",
            message: err.message,
        });
    }
};

exports.acceptResume = async (request, response) => {
    try {
        const { id } = request.params;
        const applicant = await Applicant.findOne({ _id: id });

        if (!applicant) {
            return response.status(404).json({
                status: "failure",
                message: "Applicant not found!",
            });
        }

        const { name, email } = applicant;
        
        if (!email) {
            return response.status(400).json({
                status: "failure",
                message: "Applicant email is missing!",
            });
        }

        const result = await sendEmail({
            email,
            status: "accepted",
            applicantName: name,
        });

        if (result.status === "failure") {
            return response.status(400).json({
                status: "failure",
                message: "Email sending failed",
            });
        }

        return response.status(200).json({
            status: "success",
            message: "Email sent successfully",
        });
    } catch (err) {
        console.error(err);
        return response.status(500).json({
            status: "failure",
            message: "Internal Server Error",
        });
    }
};


exports.rejectResume = async (request, response) => {
    try {
        const { id } = request.params;
        const applicant = await Applicant.findOne({ _id: id });

        if (!applicant) {
            return response.status(404).json({
                status: "failure",
                message: "Applicant not found!",
            });
        }

        const { name, email } = applicant;

        if (!email) {
            return response.status(400).json({
                status: "failure",
                message: "Applicant email is missing!",
            });
        }

        const result = await sendEmail({
            email,
            status: "rejected",
            applicantName: name,
        });
        
        if (result.status === "failure") {
            return response.status(400).json({
                status: "failure",
                message: "Email sending failed",
            });
        }

        return response.status(200).json({
            status: "success",
            message: "Email sent successfully",
        });
    } catch (err) {
        console.error(err);
        return response.status(500).json({
            status: "failure",
            message: err.message,
        });
    }
};

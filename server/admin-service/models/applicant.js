const mongoose = require("mongoose");

const applicantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true,
    },
    resumeLink: {
        type: String,
        required: true,
    },
    goodPoints: {
        type: [String],
    },
    improvementAreas: {
        type: [String],
    },
    score: {
        type: Number,
    }
});

module.exports = mongoose.model("Applicant", applicantSchema);

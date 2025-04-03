const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: true,
    },
    postedAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ["open", "closed"],
        default: "open",
    },
});

module.exports = mongoose.model("Job", jobSchema);

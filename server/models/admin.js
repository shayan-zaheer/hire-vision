const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    provider: {
        type: String,
        required: true
    },
    providerId: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    profilePhoto: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Admin", adminSchema);

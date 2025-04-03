const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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

adminSchema.methods.comparePassword = function (pass) {
    return bcrypt.compare(pass, this.password);
};

module.exports = mongoose.model("Admin", adminSchema);

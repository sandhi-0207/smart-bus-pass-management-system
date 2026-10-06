const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
    {
        applicationNumber: {
            type: String,
            required: true,
            unique: true
        },

        studentName: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true
        },

        routeNumber: {
            type: String,
            required: true
        },

        passType: {
            type: String,
            required: true,
            default: "Student"
        },

        applicationDate: {
            type: Date,
            default: Date.now
        },

        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Application", applicationSchema);
const mongoose = require("mongoose");

const busPassSchema = new mongoose.Schema(
    {
        passNumber: {
            type: String,
            required: true,
            unique: true
        },

        applicationNumber: {
            type: String,
            required: true
        },

        studentName: {
            type: String,
            required: true
        },

        routeNumber: {
            type: String,
            required: true
        },

        passType: {
            type: String,
            required: true
        },

        issueDate: {
            type: Date,
            required: true
        },

        expiryDate: {
            type: Date,
            required: true
        },

        status: {
            type: String,
            enum: ["active", "expired", "cancelled"],
            default: "active"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("BusPass", busPassSchema);
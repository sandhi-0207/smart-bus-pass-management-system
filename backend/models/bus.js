const mongoose = require("mongoose");

const busSchema = new mongoose.Schema(
    {
        busNumber: {
            type: String,
            required: true,
            unique: true
        },

        busName: {
            type: String,
            required: true
        },

        registrationNumber: {
            type: String,
            required: true,
            unique: true
        },

        capacity: {
            type: Number,
            required: true
        },

        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Bus", busSchema);
const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema(
    {
        routeName: {
            type: String,
            required: true
        },
        routeNumber: {
            type: String,
            required: true,
            unique: true
        },
        startPoint: {
            type: String,
            required: true
        },
        endPoint: {
            type: String,
            required: true
        },
        stops: {
            type: [String],
            default: []
        },
        distance: {
            type: String,
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

module.exports = mongoose.model("Route", routeSchema);
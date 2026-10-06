const Bus = require("../models/Bus");
// Get all buses
const getAllBuses = async (req, res) => {
    try {
        const buses = await Bus.find().sort({ createdAt: 1 });

        res.status(200).json({
            message: "Buses fetched successfully",
            buses
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch buses",
            error: error.message
        });
    }
};

// Add new bus
const createBus = async (req, res) => {
    try {
        const {
            busNumber,
            busName,
            registrationNumber,
            capacity,
            status
        } = req.body;

        if (
            !busNumber ||
            !busName ||
            !registrationNumber ||
            !capacity
        ) {
            return res.status(400).json({
                message: "Please provide all bus details"
            });
        }

        const existingBus = await Bus.findOne({
            $or: [
                { busNumber },
                { registrationNumber }
            ]
        });

        if (existingBus) {
            return res.status(400).json({
                message: "Bus number or registration number already exists"
            });
        }

        const bus = await Bus.create({
            busNumber,
            busName,
            registrationNumber,
            capacity,
            status: status || "active"
        });

        res.status(201).json({
            message: "Bus added successfully",
            bus
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to add bus",
            error: error.message
        });
    }
};

module.exports = {
    getAllBuses,
    createBus
};
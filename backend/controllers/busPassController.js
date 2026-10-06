const BusPass = require("../models/BusPass");
const Application = require("../models/Application");


const getBusPass = async (req, res) => {
    try {
        const { passNumber } = req.params;

        const busPass = await BusPass.findOne({
            passNumber
        });

        if (!busPass) {
            return res.status(404).json({
                message: "Bus pass not found"
            });
        }

        res.status(200).json({
            message: "Bus pass found",
            busPass
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch bus pass",
            error: error.message
        });
    }
};
const getBusPassByEmail = async (req, res) => {
    try {
        const { email } = req.params;

        const application = await Application.findOne({ email })
            .sort({ createdAt: -1 });

        if (!application) {
            return res.status(404).json({
                message: "No application found for this student"
            });
        }

        const busPass = await BusPass.findOne({
            applicationNumber: application.applicationNumber
        });

        if (!busPass) {
            return res.status(404).json({
                message: "No bus pass found for this student"
            });
        }

        res.status(200).json({
            message: "Bus pass fetched successfully",
            busPass
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch student bus pass",
            error: error.message
        });
    }
};
module.exports = {
    getBusPass,
    getBusPassByEmail
};
const User = require("../models/User");
const Application = require("../models/Application");
const BusPass = require("../models/BusPass");
const Bus = require("../models/Bus");

const getAdminDashboard = async (req, res) => {
    try {
        const totalStudents = await User.countDocuments({
            role: "student"
        });

        const pendingApplications =
            await Application.countDocuments({
                status: "pending"
            });

        const activePasses =
            await BusPass.countDocuments({
                status: "active"
            });

        const activeBuses =
            await Bus.countDocuments({
                status: "active"
            });

        const recentApplications =
            await Application.find()
                .sort({ createdAt: -1 })
                .limit(5);

        res.status(200).json({
            message: "Admin dashboard data fetched successfully",

            statistics: {
                totalStudents,
                pendingApplications,
                activePasses,
                activeBuses
            },

            recentApplications
        });

    } catch (error) {
        console.error("Admin dashboard error:", error);

        res.status(500).json({
            message: "Failed to fetch admin dashboard data",
            error: error.message
        });
    }
};

module.exports = {
    getAdminDashboard
};
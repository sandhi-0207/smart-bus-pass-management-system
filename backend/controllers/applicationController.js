const Application = require("../models/Application");
const BusPass = require("../models/BusPass");
// Create Bus Pass Application
const createApplication = async (req, res) => {
    try {
        const {
            studentName,
            email,
            routeNumber,
            passType
        } = req.body;

        if (!studentName || !email || !routeNumber) {
            return res.status(400).json({
                message: "Please provide student name, email and route number"
            });
        }

        const applicationNumber =
            "APP" + Date.now();

        const application = await Application.create({
            applicationNumber,
            studentName,
            email,
            routeNumber,
            passType: passType || "Student"
        });

        res.status(201).json({
            message: "Application submitted successfully",
            application
        });

    } catch (error) {
        res.status(500).json({
            message: "Application submission failed",
            error: error.message
        });
    }
};


// Track Bus Pass Application
const trackApplication = async (req, res) => {
    try {
        const { applicationNumber } = req.params;

        const application = await Application.findOne({
            applicationNumber
        });

        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        res.status(200).json({
            message: "Application found",
            application
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to track application",
            error: error.message
        });
    }
};

// Get all applications - Admin
const getAllApplications = async (req, res) => {
    try {
        const applications = await Application.find()
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Applications fetched successfully",
            applications
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch applications",
            error: error.message
        });
    }
};


// Update application status - Admin
const updateApplicationStatus = async (req, res) => {
    try {
        const { applicationNumber } = req.params;
        const { status } = req.body;

        if (!["approved", "rejected", "pending"].includes(status)) {
            return res.status(400).json({
                message: "Invalid application status"
            });
        }

        const application = await Application.findOneAndUpdate(
    { applicationNumber },
    { status },
    { new: true }
);

if (!application) {
    return res.status(404).json({
        message: "Application not found"
    });
}

if (status === "approved") {
    const existingPass = await BusPass.findOne({
        applicationNumber: application.applicationNumber
    });

    if (!existingPass) {
        const issueDate = new Date();

        const expiryDate = new Date();
        expiryDate.setMonth(expiryDate.getMonth() + 6);

        await BusPass.create({
            passNumber: "PASS" + Date.now(),
            applicationNumber: application.applicationNumber,
            studentName: application.studentName,
            routeNumber: application.routeNumber,
            passType: application.passType,
            issueDate,
            expiryDate,
            status: "active"
        });
    }
}

        res.status(200).json({
            message: `Application ${status} successfully`,
            application
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update application status",
            error: error.message
        });
    }
};

module.exports = {
    createApplication,
    trackApplication,
    getAllApplications,
    updateApplicationStatus
};

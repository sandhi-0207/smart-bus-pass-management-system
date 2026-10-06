const express = require("express");

const router = express.Router();

const {
    createApplication,
    trackApplication,
    getAllApplications,
    updateApplicationStatus
} = require("../controllers/applicationController");

// Submit bus pass application
router.post("/", createApplication);
// Track bus pass application
router.get("/:applicationNumber", trackApplication);
// Admin - get all applications
router.get("/admin/all", getAllApplications);

// Admin - update application status
router.put("/admin/:applicationNumber/status", updateApplicationStatus);
module.exports = router;
const express = require("express");
const router = express.Router();

const {
    getBusPass,
    getBusPassByEmail
} = require("../controllers/busPassController");

router.get("/student/:email", getBusPassByEmail);
router.get("/:passNumber", getBusPass);

module.exports = router;
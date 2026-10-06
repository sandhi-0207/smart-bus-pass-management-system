const express = require("express");

const router = express.Router();

const {
    getAllRoutes,
    createRoute
} = require("../controllers/routeController");

router.get("/", getAllRoutes);
router.post("/", createRoute);

module.exports = router;
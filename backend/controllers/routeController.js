const Route = require("../models/Route");

// Get all routes
const getAllRoutes = async (req, res) => {
    try {
        const routes = await Route.find().sort({ createdAt: 1 });

        res.status(200).json({
            message: "Routes fetched successfully",
            routes
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch routes",
            error: error.message
        });
    }
};

// Add new route
const createRoute = async (req, res) => {
    try {
        const {
            routeName,
            routeNumber,
            startPoint,
            endPoint,
            stops,
            distance,
            status
        } = req.body;

        if (
            !routeName ||
            !routeNumber ||
            !startPoint ||
            !endPoint ||
            !distance
        ) {
            return res.status(400).json({
                message: "Please provide all route details"
            });
        }

        const existingRoute = await Route.findOne({
            routeNumber
        });

        if (existingRoute) {
            return res.status(400).json({
                message: "Route number already exists"
            });
        }

        const route = await Route.create({
            routeName,
            routeNumber,
            startPoint,
            endPoint,
            stops: stops || [],
            distance,
            status: status || "active"
        });

        res.status(201).json({
            message: "Route added successfully",
            route
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to add route",
            error: error.message
        });
    }
};

module.exports = {
    getAllRoutes,
    createRoute
};
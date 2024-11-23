import express from "express";
import Admin_login from '../models/admin_login.js';

const router = express.Router();
router.get("/", async (req, res) => {
    try {
        const restaurants = await Admin_login.find();
        res.status(200).json({
            message: "Restaurants retrieved successfully",
            data: restaurants
        });
        console.log(restaurants);
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to retrieve restaurants",
            error: error.message
        });
    }
})

export default router;
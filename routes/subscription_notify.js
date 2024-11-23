import express from 'express';

import Admin_login from '../models/admin_login.js';

const router = express.Router();

router.get("/:restaurant", async (req, res) => {
    const { restaurant } = req.params;

    try {
        // Find the subscription_upto field for the given restaurant
        const result = await Admin_login.findOne(
            { restaurant }, // Query by restaurant name
            { subscription_upto: 1, _id: 0 } // Projection: include subscription_upto, exclude _id
        );

        if (!result) {
            return res.status(404).json({
                message: "Restaurant not found or no subscription data available",
            });
        }

        res.status(200).json({
            subscription_upto: result.subscription_upto,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch subscription data",
            error: error.message,
        });
    }
});

export default router;
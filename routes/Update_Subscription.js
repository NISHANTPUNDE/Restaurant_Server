import express from "express";
import Admin_login from "../models/admin_login.js";

const router = express.Router();

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { restaurant, username, password, subscription_upto } = req.body;
    console.log(req.body);
    try {
        const updatedSubscription = await Admin_login.findByIdAndUpdate(
            id,
            { restaurant, username, password, subscription_upto },
            { new: true, runValidators: true }
        );

        if (!updatedSubscription) {
            return res.status(404).json({
                message: "Subscription not found",
            });
        }

        res.status(200).json({
            message: "Subscription updated successfully",
            data: updatedSubscription,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update subscription",
            error: error.message,
        });
    }
});

export default router;

import express from "express";
import Admin_login from "../models/admin_login.js";

const router = express.Router();

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const {
        restaurant,
        username,
        password,
        phone,
        agent,
        subscription_plan,
        subscription_start,
        todaydate
    } = req.body;

    console.log("req data", req.body, req.params);

    try {
        // Parse the subscription_start date or use the current date as default
        const startDate = subscription_start ? new Date(subscription_start) : new Date(todaydate);
        const currentDate = todaydate ? new Date(todaydate) : new Date();
        let subscription_upto = new Date(currentDate); // Ensure this is a Date object

        // Calculate the subscription_upto date based on the plan
        if (subscription_plan === "1-year") {
            subscription_upto.setFullYear(subscription_upto.getFullYear() + 1);
        } else if (subscription_plan === "1-month") {
            subscription_upto.setMonth(subscription_upto.getMonth() + 1);
        } else if (subscription_plan === "6-month") {
            subscription_upto.setMonth(subscription_upto.getMonth() + 6);
        } else if (subscription_plan === "3-month") {
            subscription_upto.setMonth(subscription_upto.getMonth() + 3);
        } else if (subscription_plan === "2-month") {
            subscription_upto.setMonth(subscription_upto.getMonth() + 2);
        } else if (subscription_plan === "4-month") {
            subscription_upto.setMonth(subscription_upto.getMonth() + 4);
        } else {
            return res.status(400).json({
                message: "Invalid subscription plan. Valid options are '1-year', '6-month', '3-month', '2-month', '4-month', or '1-month'.",
            });
        }

        // Update the admin subscription details
        const updatedSubscription = await Admin_login.findByIdAndUpdate(
            id,
            {
                restaurant,
                username,
                password,
                phone,
                agent,
                subscription_plan,
                subscription_start: startDate,
                subscription_upto,
            },
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
        console.error(error);
        res.status(500).json({
            message: "Failed to update subscription",
            error: error.message,
        });
    }
});

export default router;

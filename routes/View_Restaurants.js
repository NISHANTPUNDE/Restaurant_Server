import express from "express";
import Admin_login from "../models/admin_login.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // Fetch restaurants sorted by updatedAt in descending order
    const restaurants = await Admin_login.find().sort({ updatedAt: -1 });
    res.status(200).json({
      message: " ok Retrieved successfully",
      data: restaurants,
    });
    console.log(restaurants);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve restaurants",
      error: error.message,
    });
  }
});

export default router;

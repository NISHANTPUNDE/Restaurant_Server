import express from 'express';
import Admin_login from '../models/admin_login.js';
const router = express.Router();

router.get("/", async (req, res) => {
    const days = parseInt(req.query.days) || 7;
    console.log(days);
    try {
        const expiringSubscriptions = await Admin_login.findExpiringSubscriptions(days);
        res.json({ success: true, data: expiringSubscriptions });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
});

export default router;
import express from 'express';
import Admin_login from '../models/admin_login.js';

const router = express.Router();

router.post('/restaurant', async (req, res) => {
    console.log(req.body);
    try {
        const admin = await Admin_login.findOne({ username: req.body.email })
        if (!admin) {
            return res.status(404).json({
                message: 'Admin not found'
            });

        }
        if (admin.password !== req.body.password) {
            return res.status(401).json({
                message: 'Invalid password'
            });
        }
        const adminData = admin.toObject();
        console.log("Login successful, restaurant:", adminData.restaurant);
        res.status(200).json({
            message: 'Login successful',
            restaurant: adminData.restaurant
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to login',
            error: error.message
        });
    }
});

export default router;


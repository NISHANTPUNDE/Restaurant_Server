import express from 'express';
import Admin_login from '../models/admin_login.js';
const router = express.Router();

router.post('/', async (req, res) => {
    console.log(req.body);

    try {
        const restaurant = await Admin_login.create(req.body);
        res.status(201).json({
            message: 'Restaurant created successfully',
            restaurant: restaurant
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to create restaurant',
            error: error.message
        });
    }
});

export default router;



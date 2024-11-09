import express from 'express';
import jwt from 'jsonwebtoken';
import Super_Admin from '../models/super_adminlogin.js';

const router = express.Router();
const JWT_SECRET = process.env.SECRET_KEY

router.post('/', async (req, res) => {
    console.log(req.body);
    try {
        const admin = await Super_Admin.findOne({ username: req.body.email });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        if (admin.password !== req.body.password) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: admin._id, restaurant: admin.restaurant }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({
            message: 'Login successful',
            token,
            restaurant: admin.restaurant
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to login',
            error: error.message
        });
    }
});

export default router;

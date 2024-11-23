import express from 'express';
import Admin_login from '../models/admin_login.js';

const router = express.Router();

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedRestaurant = await Admin_login.findByIdAndDelete(id);

        if (!deletedRestaurant) {
            return res.status(404).json({
                message: 'Restaurant not found'
            });
        }

        res.status(200).json({
            message: 'Restaurant deleted successfully',
            data: deletedRestaurant
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to delete restaurant',
            error: error.message
        });
    }
});

export default router;
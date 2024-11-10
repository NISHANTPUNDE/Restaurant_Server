import express from 'express';
import Menu_card from '../models/restaurant_menu.js';

const router = express.Router();

router.get('/:restaurant', async (req, res) => {
    try {
        const menu_item = await Menu_card.find({ restaurant: req.params.restaurant });
        if (!menu_item) {
            return res.status(404).json({
                message: 'Menu item not found'
            });
        }
        res.status(200).json({
            message: 'Menu item retrieved successfully',
            data: menu_item
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to retrieve menu item',
            error: error.message
        });
    }
});

export default router;
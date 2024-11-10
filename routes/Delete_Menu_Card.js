import express from 'express';
import Menu_card from '../models/restaurant_menu.js';

const router = express.Router();

router.delete('/', async (req, res) => {
    try {
        const { restaurant } = req.query;
        console.log(restaurant)
        const menuItem = await Menu_card.findOne({ restaurant });

        if (!menuItem) {
            return res.status(404).json({
                message: 'Menu item not found'
            });
        }

        await Menu_card.deleteOne({ restaurant });

        res.status(200).json({
            message: 'Menu item deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to delete menu item',
            error: error.message
        });
    }
});

export default router;

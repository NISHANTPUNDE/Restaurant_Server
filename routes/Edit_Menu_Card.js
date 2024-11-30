import express from 'express';
import Menu_card from '../models/restaurant_menu.js';

const router = express.Router();

router.put('/', async (req, res) => {
    try {
        const { restaurant, dataRestro, dishesByType } = req.body;
        console.log("req receive",req.body);

        // Find the menu item by a unique identifier (e.g., restaurant name or ID)
        const menuItem = await Menu_card.findOne({ restaurant });

        if (!menuItem) {
            return res.status(404).json({
                message: 'Menu item not found'
            });
        }

        // Update the fields
        menuItem.hotelName = dataRestro.hotelName;
        menuItem.address = dataRestro.address;
        menuItem.phone = dataRestro.phone;
        menuItem.dishesByType = dishesByType;
        menuItem.dishmenuTemplete = dataRestro.dishmenuTemplete;
        menuItem.dishmenuColor = dataRestro.dishmenuColor;

        const updatedItem = await menuItem.save();

        res.status(200).json({
            message: 'Menu item updated successfully',
            data: updatedItem
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to update menu item',
            error: error.message
        });
    }
});

export default router;

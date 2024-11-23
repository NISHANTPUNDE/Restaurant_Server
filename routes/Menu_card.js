import express from 'express';
import Menu_card from '../models/restaurant_menu.js';
const router = express.Router();

router.post('/add', async (req, res) => {
    try {
        console.log("add meu card",req.body);
        const menu_item = new Menu_card({
            hotelName: req.body.dataRestro.hotelName,
            address: req.body.dataRestro.address,
            phone: req.body.dataRestro.phone,
            dishesByType: req.body.dishesByType,
            dishmenuTemplete: req.body.dataRestro.dishmenuTemplete,
            dishmenuColor: req.body.dataRestro.dishmenuColor,
            restaurant: req.body.restaurant
        });

        const savedItem = await menu_item.save();

        res.status(201).json({
            message: 'Menu item added successfully',
            data: savedItem
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to add menu item',
            error: error.message
        });
    }
});

export default router; 
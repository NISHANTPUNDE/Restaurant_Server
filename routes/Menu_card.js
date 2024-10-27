import express from 'express';
import Menu_card from '../models/restaurant_menu.js'; // Use ES6 import

const router = express.Router();

router.post('/add', async (req, res) => {
    try {
        console.log(req.body);
        const menu_item = new Menu_card({
            hotelName: req.body.hotelName,
            address: req.body.address,
            phone: req.body.phone,
            dishesByType: req.body.dishesByType,
            dishmenuTemplete: req.body.dishmenuTemplete,
            dishmenuColor: req.body.dishmenuColor,
            restaurant: req.body.restaurant
        });

        // Save the menu item to the database
        const savedItem = await menu_item.save();

        // Return a success response with the saved item
        res.status(201).json({
            message: 'Menu item added successfully',
            data: savedItem
        });
    } catch (error) {
        // Handle errors and return a 500 status code if something goes wrong
        res.status(500).json({
            message: 'Failed to add menu item',
            error: error.message
        });
    }
});

export default router; 
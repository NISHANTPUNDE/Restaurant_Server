import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import menu_router from './routes/Menu_card.js';
import editmenucard from './routes/Edit_Menu_Card.js';
import login_router from './routes/Admin_login.js';
import menu_item_router from './routes/Get_menu_item.js';
import SuperAdmin_login from './routes/SupeAdmin_login.js';
import createRestaurant from './routes/Create_Restaurant.js';
import deleteMenuCard from './routes/Delete_Menu_Card.js';
import view_restaurants from './routes/View_Restaurants.js'
import update_subscription from './routes/Update_Subscription.js'
import verifyToken from './midddleware/authMiddleware.js'



const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

mongoose.connect('mongodb+srv://blogging:Blog%40Next@clusterforblog.r8rr1.mongodb.net/?retryWrites=true&w=majority&appName=clusterforblog').then(
    () => {
        console.log('Connected to MongoDB');
    }
).catch(
    (error) => {
        console.log('Connection failed: ', error);
    }
);

const __dirname = path.resolve();
console.log(__dirname);

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/api/getmenuitem', menu_item_router);
app.use('/api/restaurant', menu_router);
app.use('/api/restaurant/edit', editmenucard);
app.use('/api/restaurant/delete', deleteMenuCard);
app.use('/api/login', login_router);
app.use('/api/login/superadmin', SuperAdmin_login);
app.use('/api/create-restaurant-account', createRestaurant);
app.use('/api/getallrestaurants', view_restaurants)
app.use('/api/updatesubscription', update_subscription)
app.get('/api/getmenuimages', (req, res) => {
    const imagesDir = path.join(__dirname, 'public');

    fs.readdir(imagesDir, (err, files) => {
        if (err) {
            return res.status(500).json({ message: 'Unable to scan directory: ' + err });
        }

        // Filter for image files only (you can adjust the extensions as needed)
        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/.test(file));
        const imagePaths = imageFiles.map(file => `${req.protocol}://${req.get('host')}/public/${file}`);

        res.status(200).json({
            message: 'Images retrieved successfully',
            images: imagePaths
        });
    });
});
app.use((req, res) => {
    res.status(404).json({
        message: 'Route not found'
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
}
);  

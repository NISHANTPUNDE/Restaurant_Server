import mongoose from 'mongoose';

const dishSchema = new mongoose.Schema({
    dishName: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

const dishTypeSchema = new mongoose.Schema({
    dishType: {
        type: String,
        required: true,
    },
    dishes: [dishSchema],
});

const restaurantSchema = new mongoose.Schema({
    hotelName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    dishesByType: [dishTypeSchema],
    dishmenuTemplete: {
        type: String,
        required: true,
    },
    dishmenuColor: {
        type: String,
    },
    restaurant: {
        type: String,
        required: true,
    },
},
    { timestamps: true });

const Menu_card = mongoose.model('Restaurant', restaurantSchema);


export default Menu_card;

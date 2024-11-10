import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    restaurant: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Admin_login = mongoose.model('Admin', adminSchema);

export default Admin_login;
import mongoose from "mongoose";

const superadminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Super_Admin = mongoose.model('Super_Admin', superadminSchema);

export default Super_Admin;
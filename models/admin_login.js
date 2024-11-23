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
    phone: {
        type: String,
        required: true,
    },
    agent: {
        type: String,
        required1: true,
    },
    previos_subscription: {
        type: [String],
    },
    subscription_plan: {
        type: String,
        required: true,
    },
    subscription_start: {
        default: new Date(),
        type: Date,
        required: true,
    },
    subscription_upto: {
        type: Date,
        required: true,
    },
}, { timestamps: true });

adminSchema.statics.findExpiringSubscriptions = function (days = 7) {
    const today = new Date();
    const upcomingDate = new Date();
    upcomingDate.setDate(today.getDate() + days);

    return this.find({
        subscription_upto: { $gte: today, $lte: upcomingDate },
    });
};

const Admin_login = mongoose.model('Admin', adminSchema);

export default Admin_login;
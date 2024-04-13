const mongoose = require("mongoose");

const FoodScheama = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    qty: {
        type: String,
        required: true
    },
    qtyUnit: {
        type: String,
        required: true
    },
    ratings: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const FoodModel = mongoose.model('food', FoodScheama);
module.exports = FoodModel;
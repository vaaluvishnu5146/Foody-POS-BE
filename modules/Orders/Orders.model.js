const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
    user: {
        type: String,
        ref: 'user',
        required: true
    },
    orderValue: {
        type: Number,
        required: true
    },
    products: {
        type: Array,
        required: true
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    transactionType: {
        type: String,
        default: 'cod',
    },
    transactionId: {
        type: String,
        ref: 'transaction',
        required: false
    }
}, { timestamps: true });

const OrderModel = mongoose.model('order', OrderSchema);
module.exports = OrderModel;
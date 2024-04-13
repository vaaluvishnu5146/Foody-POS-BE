const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    mobileNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

const UserModel = mongoose.model('user', UserSchema);
module.exports = UserModel;
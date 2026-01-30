const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true
    },
    otp: {
        type: Number
    },
}, { timestamps: true })

module.exports.otps = mongoose.model('otps', otpSchema)
const mongoose = require("mongoose")
const scanSchema = new mongoose.Schema({
    qrId: {
        type: String,
        required: true,
        unique: true
    },
    url: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Scan', scanSchema)
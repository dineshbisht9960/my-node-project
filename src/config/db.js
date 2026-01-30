const mongoose = require('mongoose');

module.exports.connectDb = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/userDB'); 
        console.log("DB connected ");
    } catch (err) {
        console.log("DB NOT connected ");
        console.error(err); 
    }
};
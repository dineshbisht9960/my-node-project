const mongoose = require('mongoose');

module.exports.connectDb = async () => {
    try {
        await mongoose.connect(process.env.URL); 
        console.log("DB connected ");
    } catch (err) {
        console.log("DB NOT connected ");
        console.error(err); 
    }
};
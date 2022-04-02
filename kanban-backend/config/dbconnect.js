const mongoose = require("mongoose");

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        
        console.log(`Mongo DB Connected on port: ${conn.connection.host}`.cyan.underline.bold);
    } catch (err) {
        console.log(`Error: ${err.message}`.red);
    }
}

module.exports = connectDB;
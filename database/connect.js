const mongoose = require('mongoose');

// MongoDB connection URI
const URI = 'mongodb+srv://ayamyeagah:Kubeb1012@cluster0.fmes5hv.mongodb.net/AIS';

let db = null;

// Function to connect to MongoDB
async function connectDB() {
    try {
        if(!db) {
            await mongoose.connect(URI);
            console.log('Connected to MongoDB');
            db = mongoose.connection
        }
        return db;
    } catch (error) {
        console.error('Database connection error:', error);
        return null;
    }
}

module.exports = connectDB;

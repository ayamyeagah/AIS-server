const mongoose = require('mongoose');
const config = require('../config');

// MongoDB connection URI
const URI = config.mongoose.uri;

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

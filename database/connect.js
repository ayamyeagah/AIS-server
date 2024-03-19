// const { MongoClient } = require('mongodb');

// // MongoDB connection URI
// const URI = 'mongodb+srv://ayamyeagah:Kubeb1012@cluster0.fmes5hv.mongodb.net/';
// const DB_NAME = 'AIS';

// let db = null;

// // Function to connect to MongoDB
// async function connectDB() {
//     try {
//         if (!db) {
//             const client = new MongoClient(URI);
//             await client.connect();
//             console.log('Connected to MongoDB');
//             db = client.db(DB_NAME);
//         }
//         return db;
//     } catch (error) {
//         console.error('Database connection error:', error);
//         return null;
//     }
// }

// module.exports = connectDB;

const mongoose = require('mongoose');

// MongoDB connection URI
const URI = 'mongodb+srv://ayamyeagah:Kubeb1012@cluster0.fmes5hv.mongodb.net/AIS';

// Function to connect to MongoDB
async function connectDB() {
    try {
        await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
        return mongoose.connection;
    } catch (error) {
        console.error('Database connection error:', error);
        return null;
    }
}

module.exports = connectDB;

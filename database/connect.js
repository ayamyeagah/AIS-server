const { MongoClient } = require('mongodb');

// MongoDB connection URI
// const uri = require('./uri');
const URI = 'mongodb+srv://ayamyeagah:Kubeb1012@cluster0.fmes5hv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const DB_NAME = 'AIS';

let db = null;

// Function to connect to MongoDB
async function connectDB() {
    try {
        if (!db) {
            const client = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true });
            await client.connect();
            console.log('Connected to MongoDB');
            db = client.db(DB_NAME);
        }
        return db;
    } catch (error) {
        console.error('Database connection error:', error);
        return null;
    }
}

module.exports = connectDB;


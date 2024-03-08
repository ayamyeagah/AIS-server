const { MongoClient } = require('mongodb');

// MongoDB connection URI
// const uri = require('./uri');
const URI = 'mongodb+srv://ayamyeagah:Kubeb1012@cluster0.fmes5hv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const DB_NAME = 'AIS';

const client = new MongoClient(URI);

// Function to connect to MongoDB
async function connectDB() {
    try {
        await client.connect();
        const db = await client.db(DB_NAME)
        console.log('Connected to DB')
        return client.db(); // Return the database object
    } catch (err) {
        console.error('Database connection error:', err);
        return null;
    }
}

module.exports = connectDB;


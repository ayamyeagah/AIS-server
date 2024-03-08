const connectDB = require('./connect');

// Function to store decoded message in MongoDB
async function storeInDB(decodedMessage) {
    try {
        const db = await connectDB();
        if (!db) return;

        const collection = db.collection('rawdata'); // Specify collection name
        const messageObject = { message: decodedMessage };
        await collection.insertOne(messageObject);
        console.log('Stored: ', decodedMessage);
    } catch (err) {
        console.error('Error storing message in MongoDB:', err);
    }
}

module.exports = storeInDB;

const connectDB = require('./connect');

// Function to store decoded message in MongoDB
async function storeInDB(decodedMessage) {
    try {
        const db = await connectDB();
        if (!db) {
            console.error('Database connection is not established.');
            return;
        }

        const collection = db.collection('rawdata');
        const messageObject = { message: decodedMessage };
        await collection.insertOne(messageObject);
        console.log('Stored:', decodedMessage);
    } catch (error) {
        console.error('Error storing message in MongoDB:', error);
    }
}

module.exports = storeInDB;

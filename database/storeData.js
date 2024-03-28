const connectDB = require('./connect');
const MessageSchema = require('./model/messageSchema')

// Function to store decoded message in MongoDB
async function storeInDB(decodedMessage) {
    try {
        const db = await connectDB();
        if (!db) {
            console.error('Database connection is not established.');
            return;
        }

        const messageObject = new MessageSchema(decodedMessage);
        await messageObject.save();
        console.log('Stored:', decodedMessage);
    } catch (error) {
        console.error('Error storing message in MongoDB:', error);
    }
}

module.exports = storeInDB;

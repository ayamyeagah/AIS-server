const connectDB = require('./connect');

// // Function to store decoded message in MongoDB
// async function storeInDB(decodedMessage) {
//     try {
//         const db = await connectDB();
//         if (!db) {
//             console.error('Database connection is not established.');
//             return;
//         }

//         const collection = db.collection('rawdata');
//         const messageObject = { message: decodedMessage };
//         await collection.insertOne(messageObject);
//         console.log('Stored:', decodedMessage);
//     } catch (error) {
//         console.error('Error storing message in MongoDB:', error);
//     }
// }

// module.exports = storeInDB;
const mongoose = require('mongoose');

// Define the schema for decoded messages
const decodedMessageSchema = new mongoose.Schema({
    type: Number,
    channel: String,
    repeat: Number,
    mmsi: Number,
    navStatus: Number,
    rateOfTurn: Number,
    speedOverGround: Number,
    accuracy: Boolean,
    lon: Number,
    lat: Number,
    courseOverGround: Number,
    heading: Number,
    utcSecond: Number,
    specialManoeuvre: Number,
    raim: Boolean,
    radio: Number,
    sentences: [String]
});

// Define a model for decoded messages
const DecodedMessage = mongoose.model('DecodedMessage', decodedMessageSchema);

// Function to store decoded message in MongoDB
async function storeInDB(decodedMessage) {
    try {
        const db = await connectDB();
        if (!db) {
            console.error('Database connection is not established.');
            return;
        }

        const messageObject = new DecodedMessage(decodedMessage);
        await messageObject.save();
        console.log('Stored:', decodedMessage);
    } catch (error) {
        console.error('Error storing message in MongoDB:', error);
    }
}

module.exports = storeInDB;

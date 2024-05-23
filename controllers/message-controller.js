/* Controller for AIS message
*/

// const Consumer = require('../services/consumer');
// const Message = require('../models/message.schema');
// const NMEADecoder = require('../utils/decoder-service');
// const decoder = new NMEADecoder();

// module.exports = async function messageController() {
//     try {
//         await Consumer((nmea) => {
//             decoder.write(nmea)
//                 .then(aisMsg => {
//                     saveMessages(aisMsg);
//                 });
//         });
//     } catch (error) {
//         console.error('Error consuming message:', error);
//     }
// };

// const saveMessages = async (messages) => {
//     try {
//         // Ensure messages is array
//         if (!Array.isArray(messages)) {
//             messages = [messages];
//         }

//         // Validate messages
//         const validatedMessages = messages.map(msg => {
//             const newMessage = new Message(msg);
//             return newMessage.validate();
//         });

//         // Await validatio for all messages
//         await Promise.all(validatedMessages);

//         // Save
//         const results = await Message.insertMany(messages);
//         // console.log('Saved:', results);
//     } catch (error) {
//         console.error('Error saving AIS messages:', error.message);
//     }
// };

const Consumer = require('../services/consumer');
const Message = require('../models/message.schema');
const NMEADecoder = require('../utils/decoder-service');

const decoder = new NMEADecoder();
const BATCH_SIZE = 50;  // Define the batch size

module.exports = async function messageController() {
    try {
        let batch = [];
        await Consumer(async (nmea) => {
            try {
                const aisMsg = await decoder.write(nmea);
                batch.push(aisMsg);

                if (batch.length >= BATCH_SIZE) {
                    await saveMessages(batch);
                    batch = [];  // Clear the batch after processing
                }
            } catch (error) {
                console.error('Error decoding or saving message:', error);
            }
        });

        // Process remaining messages if any
        if (batch.length > 0) {
            await saveMessages(batch);
        }
    } catch (error) {
        console.error('Error consuming message:', error);
    }
};

// const saveMessages = async (messages) => {
//     try {
//         const validatedMessages = messages.map(msg => {
//             const newMessage = new Message(msg);
//             return newMessage.validate().then(() => newMessage);
//         });

//         const results = await Message.insertMany(await Promise.all(validatedMessages));
//         console.log('Saved messages:', results);
//     } catch (error) {
//         console.error('Error saving AIS messages:', error.message);
//     }
// };

// const mongoose = require('mongoose');
// const Message = require('../models/message.schema');
const Dynamic = require('../models/dynamic.schema');
const Static = require('../models/static.schema');

// // Define schemas and models for CollectionA and CollectionB
// const collectionASchema = new mongoose.Schema({
//     field1: String,
//     field2: String,
//     // other fields...
// });
// const CollectionA = mongoose.model('CollectionA', collectionASchema);

// const collectionBSchema = new mongoose.Schema({
//     field1: String,
//     field2: String,
//     // other fields...
// });
// const CollectionB = mongoose.model('CollectionB', collectionBSchema);

const saveMessages = async (messages) => {
    try {
        const validatedMessages = messages.map(msg => {
            const newMessage = new Message(msg);
            return newMessage.validate().then(() => newMessage);
        });

        const savedMessages = await Message.insertMany(await Promise.all(validatedMessages));
        console.log('Saved messages:', savedMessages);

        // Filter messages and save to CollectionA and CollectionB
        const messagesForA = savedMessages.filter(msg => filterForCollectionA(msg));
        const messagesForB = savedMessages.filter(msg => filterForCollectionB(msg));

        if (messagesForA.length > 0) {
            await Dynamic.insertMany(messagesForA);
            console.log('Saved messages to CollectionA:', messagesForA);
        }

        if (messagesForB.length > 0) {
            await Static.insertMany(messagesForB);
            console.log('Saved messages to CollectionB:', messagesForB);
        }
    } catch (error) {
        console.error('Error saving AIS messages:', error.message);
    }
};

const filterForCollectionA = (message) => {
    // Define your filter logic for CollectionA
    const typesForA = [1, 2, 3, 4, 18];
    return typesForA.includes(message.type);
};

const filterForCollectionB = (message) => {
    // Define your filter logic for CollectionB
    const typesForB = [5, 8, 24];
    return typesForB.includes(message.type);
};

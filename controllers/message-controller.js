/* Controller for AIS message
*/

const Consumer = require('../services/consumer');
const Message = require('../models/message.schema');
const Dynamic = require('../models/dynamic.schema');
const Static = require('../models/static.schema');
const NMEADecoder = require('../utils/decoder-service');

// const consumer = new Consumer();
const decoder = new NMEADecoder();
const BATCH_SIZE = 50;

module.exports = async function messageController() {
    try {
        let batch = [];
        await Consumer(async (nmea) => {
            try {
                const aisMsg = await decoder.write(nmea);
                batch.push(aisMsg);

                if (batch.length >= BATCH_SIZE) {
                    await saveMessages(batch);
                    batch = [];
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

const saveMessages = async (messages) => {
    try {
        const validatedMessages = messages.map(msg => {
            const newMessage = new Message(msg);
            return newMessage.validate().then(() => newMessage);
        });

        const savedMessages = await Message.insertMany(await Promise.all(validatedMessages));
        console.log('Saved to DB');

        // Filter messages and save to Dynamic and Static
        const dataForDynamic = savedMessages.filter(msg => filterForDynamic(msg));
        const dataForStatic = savedMessages.filter(msg => filterForStatic(msg));

        if (dataForDynamic.length > 0) {
            await Dynamic.insertMany(dataForDynamic);
            console.log('Saved to Dynamic');
        }

        if (dataForStatic.length > 0) {
            await Static.insertMany(dataForStatic);
            console.log('Saved to Static');
        }
    } catch (error) {
        console.error('Error saving AIS messages:', error.message);
    }
};

const filterForDynamic = (message) => {
    // Filter logic for Dynamic
    const typesForDynamic = [1, 2, 3, 4, 18];
    return typesForDynamic.includes(message.type);
};

const filterForStatic = (message) => {
    // Filter logic for Static
    const typesForStatic = [5, 8, 24];
    return typesForStatic.includes(message.type);
};

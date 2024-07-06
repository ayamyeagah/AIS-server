/* Controller for AIS message
*/

const Consumer = require('../services/consumer');
const Message = require('../models/message.schema');
const Dynamic = require('../models/dynamic.schema');
const Static = require('../models/static.schema');
const Recents = require('../models/recents.schema');
const NMEADecoder = require('../utils/decoder-service');

// const consumer = new Consumer();
const decoder = new NMEADecoder();
const BATCH_SIZE = 500;

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
        // console.log('Saved to DB');

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

        // Upsert to latest collection using bulkWrite
        if (dataForDynamic.length > 0) {
            const bulkOps = dataForDynamic.map(dynamicMsg => ({
                updateOne: {
                    filter: { mmsi: dynamicMsg.mmsi },
                    update: {
                        $set: {
                            dynamic: dynamicMsg,
                            location: {
                                type: "Point",
                                coordinates: [dynamicMsg.lon, dynamicMsg.lat]
                            }
                        }
                    },
                    upsert: true
                }
            }));

            await Recents.bulkWrite(bulkOps);
            console.log('Saved to Latest');
        }

        // await updateLatestCollection(dataForDynamic, dataForStatic);
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

// const updateLatestCollection = async (dynamicMessages, staticMessages) => {
//     try {
//         const latestData = {};

//         dynamicMessages.forEach(msg => {
//             if (!latestData[msg.mmsi]) {
//                 latestData[msg.mmsi] = { mmsi: msg.mmsi, dynamic: {}, static: {} };
//             }
//             latestData[msg.mmsi].dynamic = msg;
//         });

//         staticMessages.forEach(msg => {
//             if (!latestData[msg.mmsi]) {
//                 latestData[msg.mmsi] = { mmsi: msg.mmsi, dynamic: {}, static: {} };
//             }
//             latestData[msg.mmsi].static = msg;
//         });

//         const latestEntries = Object.values(latestData);

//         await Recents.insertMany(latestEntries);
//         console.log('Saved to Latest');
//     } catch (error) {
//         console.error('Error updating latest collection:', error.message);
//     }// };
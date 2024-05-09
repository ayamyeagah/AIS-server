/* Controller for AIS message
*/

const Consumer = require('../services/consumer');
const Message = require('../models/message.schema');
const NMEADecoder = require('../utils/decoder-service');
const decoder = new NMEADecoder();

module.exports = async function messageController() {
    try {
        await Consumer((nmea) => {
            decoder.write(nmea)
                .then(aisMsg => {
                    saveMessages(aisMsg);
                });
        });
    } catch (error) {
        console.error();
    }
};

const saveMessages = async (messages) => {
    try {
        // Ensure messages is array
        if (!Array.isArray(messages)) {
            messages = [messages];
        }

        // Validate messages
        const validatedMessages = messages.map(msg => {
            const newMessage = new Message(msg);
            return newMessage.validate();
        });

        // Await validatio for all messages
        await Promise.all(validatedMessages);

        // Save
        const results = await Message.insertMany(messages);
        // console.log('Saved:', results);
    } catch (error) {
        console.error('Error saving AIS messages:', error.message);
    }
};

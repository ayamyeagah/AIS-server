const saveDynamic = require('./insert-dynamic');
const saveStatic = require('./insert-static');
const Message = require('../../models/message.schema');

const saveMessages = async (messages) => {
    try {
        const validatedMessages = messages.map(msg => {
            const newMessage = new Message(msg);
            return newMessage.validate().then(() => newMessage);
        });

        const savedMessages = await Message.insertMany(await Promise.all(validatedMessages));

        saveDynamic(savedMessages);
        saveStatic(savedMessages);

    } catch (error) {
        console.error('Error saving AIS messages:', error.message);
    }
};

module.exports = saveMessages;
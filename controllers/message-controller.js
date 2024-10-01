const Consumer = require('../services/amqp/consumer');
const NMEADecoder = require('../utils/decoder-service');
const saveMessages = require('../services/message/insert-message');

const consumer = new Consumer();
const decoder = new NMEADecoder();
const BATCH_SIZE = 500;

module.exports = async function messageController() {
    try {
        let batch = [];
        await consumer.sub(async (raw) => {
            try {
                const aisMsg = await decoder.write(raw);
                batch.push(aisMsg);

                if (batch.length >= BATCH_SIZE) {
                    await saveMessages(batch);
                    batch = [];
                }
            } catch (error) {
                console.error('Error decoding or saving message:', error);
            }
        });

        if (batch.length > 0) { await saveMessages(batch) }
    } catch (error) {
        console.error('Error consuming message:', error);
    }
};

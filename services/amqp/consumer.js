/* function for consuming incoming data from queue
*/

const config = require('../../config/config');
const amqp = require('amqplib');

// const uri = config.amqp.public.uri;
// const routingKey = config.amqp.public.routing;
// const exchange = config.amqp.public.exchange;
// const queueName = config.amqp.public.queue;

const PREFETCH_COUNT = 500
const BATCH_SIZE = 500

// class Consumer {
//     channel;

//     async createChannel() {
//         try {
//             const conn = await amqp.connect(uri);
//             this.channel = await conn.createChannel();
//         } catch (err0) {
//             console.error('Error connection & creating channel:', err0);
//         }
//     }

//     async sub(callback) {
//         try {
//             if (!this.channel) {
//                 await this.createChannel();
//             }

//             await this.channel.assertExchange(exchange, 'direct');
//             const q = await this.channel.assertQueue(queueName);
//             await this.channel.bindQueue(q.queue, exchange, routingKey);

//             channel.prefetch(PREFETCH_COUNT);

//             let messages = []

//             this.channel.consume(q.queue, (msg) => {
//                 if (msg !== null) {
//                     const data = JSON.parse(msg.content);
//                     messages.push({ message: data.message, msgObj: msg });

//                     if (messages.length >= BATCH_SIZE) {
//                         processBatch(messages, callback, channel);
//                         messages = [];
//                     }
//                 }
//             }, { noAck: false });

//             setInterval(() => {
//                 if (messages.length > 0) {
//                     processBatch(messages, callback, channel);
//                     messages = [];
//                 }
//             }, 1000);
//         } catch (err1) {
//             console.error('Error consuming message:', err1);
//         }
//     }
// }

// function processBatch(messages, callback, channel) {
//     messages.forEach(({ message, msgObj }) => {
//         callback(message);
//         channel.ack(msgObj);
//     });
// }

// module.exports = Consumer;

/*
* Uncomment this to listening for local streaming data
* Dont forget to adapting calling function in controllers/message-controller.js
*/
async function consumeMsg(callback) {
    const conn = await amqp.connect(config.amqp.local.uri);
    const channel = await conn.createChannel();

    const exchangeName = config.amqp.local.exchange;
    const routingKey = config.amqp.local.routingKey;
    const queueName = config.amqp.local.infoQueue;

    await channel.assertExchange(exchangeName, 'direct');
    const q = await channel.assertQueue(queueName);
    await channel.bindQueue(q.queue, exchangeName, routingKey);

    channel.prefetch(PREFETCH_COUNT);

    let messages = []

    channel.consume(q.queue, (msg) => {
        if (msg !== null) {
            const data = JSON.parse(msg.content);
            messages.push({ message: data.message, msgObj: msg });

            if (messages.length >= BATCH_SIZE) {
                processBatch(messages, callback, channel);
                messages = [];
            }
        }
    }, { noAck: false });

    setInterval(() => {
        if (messages.length > 0) {
            processBatch(messages, callback, channel);
            messages = [];
        }
    }, 1000);
}

function processBatch(messages, callback, channel) {
    messages.forEach(({ message, msgObj }) => {
        callback(message);
        channel.ack(msgObj);
    });
}

module.exports = consumeMsg;

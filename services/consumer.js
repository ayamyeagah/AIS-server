const amqp = require('amqplib');
const config = require('../routes/config');
const NMEADecoder = require('../utils/decoder');
const nmeaDecoder = new NMEADecoder();

// 1. Connect to RabbitMQ server
// 2. Create a new channel
// 3. Create the exchange
// 4. Create the queue
// 5. Bind the queue to the exchange
// 6. Consume message from the queue

async function consumeMsg() {
    const conn = await amqp.connect(config.rabbitMQ.uri);
    const channel = await conn.createChannel();

    const exchangeName = config.rabbitMQ.exchange;
    const queueName = config.rabbitMQ.infoQueue;
    
    await channel.assertExchange(exchangeName, 'direct');

    const q = await channel.assertQueue(queueName);

    await channel.bindQueue(q.queue, exchangeName, 'nmea');

    channel.consume(q.queue, (msg) => {
        const data = JSON.parse(msg.content);
        nmeaDecoder.write(data.message);
        channel.ack(msg);
    });
}

consumeMsg();
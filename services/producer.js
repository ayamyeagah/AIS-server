const amqp = require('amqplib');
const config = require('../routes/config');

// 1. Connect to RabbitMQ server
// 2. Create a new channel on that connection
// 3. Create the exchange
// 4. Publish the message to the exchange with a routing key

class Producer {
    channel;

    async createChannel() {
        const conn = await amqp.connect(config.rabbitMQ.uri);
        this.channel = await conn.createChannel();
    }

    async publishMsg (routingKey, message) {
        if (!this.channel) {
            await this.createChannel();
        }

        const exchangeName = config.rabbitMQ.exchange;
        await this.channel.assertExchange(exchangeName, 'direct');
        
        const msg = {
            logType: config.rabbitMQ.infoBindKey,
            message: message,
            dateTime: new Date()
        };

        await this.channel.publish(
            exchangeName,
            routingKey,
            Buffer.from(JSON.stringify(msg))
        );

        console.log(`${message} sent to ${exchangeName}`);
    }
}

module.exports = Producer;
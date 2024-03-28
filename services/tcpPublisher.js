const amqp = require('amqplib');
const config = require('../routes/config');

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
            logType: routingKey,
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
/* class for create producer in message queueing
*/

const config = require('../../config/config');
const amqp = require('amqplib');

class Producer {
    channel;

    async createChannel() {
        const conn = await amqp.connect(config.amqp.local.uri);
        this.channel = await conn.createChannel();
    }

    async publishMsg(routingKey, message) {
        if (!this.channel) {
            await this.createChannel();
        }

        const exchangeName = config.amqp.local.exchange;
        await this.channel.assertExchange(exchangeName, 'direct');

        const msg = {
            type: config.amqp.local.routingKey,
            message: message
        };

        await this.channel.publish(
            exchangeName,
            routingKey,
            Buffer.from(JSON.stringify(msg))
        );

        // console.log(`${message}`);
    }
}

module.exports = Producer;
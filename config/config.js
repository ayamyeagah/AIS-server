/**
 * configuration
 */

const dotenv = require('dotenv');
const path = require('path');

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

module.exports = {
    db: {
        uri: process.env.MONGODB_URI,
    },
    collection: {
        raw: process.env.COLLECTION_RAW,
        vessel: process.env.COLLECTION_VESSEL,
        anomaly: process.env.COLLECTION_ANOMALY,
        message: process.env.COLLECTION_MESSAGE,
        view: {
            latest: process.env.COLLECTION_VIEW_LATEST,
            traffic: process.env.COLLECTION_VIEW_TRAFFIC,
        },
        static: process.env.COLLECTION_STATIC,
        dynamic: process.env.COLLECTION_DYNAMIC,
    },
    tcp: {
        host: process.env.TCP_HOST,
        port: process.env.TCP_PORT,
    },
    amqp: {
        local: {
            uri: process.env.AMQP_LOCAL_URI,
            routingKey: process.env.AMQP_LOCAL_ROUTING_KEY,
            exchange: process.env.AMQP_LOCAL_EXCHANGE,
            infoQueue: process.env.AMQP_LOCAL_INFO_QUEUE,
        },
        public: {
            host: process.env.AMQP_PUBLIC_HOST,
            uri: process.env.AMQP_PUBLIC_URI,
            port: process.env.AMQP_PUBLIC_PORT,
            SSL: {
                ca: process.env.AMQP_PUBLIC_SSL_CA,
                cert: process.env.AMQP_PUBLIC_SSL_CERT,
                key: process.env.AMQP_PUBLIC_SSL_KEY,
            },
            exchange: process.env.AMQP_PUBLIC_EXCHANGE,
            routing: process.env.AMQP_PUBLIC_ROUTING,
            queue: process.env.AMQP_PUBLIC_QUEUE,
        }
    },
    app: {
        port: process.env.APP_PORT,
    }
};

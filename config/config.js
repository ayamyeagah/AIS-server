/* for config environment
migrate to .env, very soon.
*/

module.exports = {
    mongoose: {
        // uri : 'mongodb+srv://ayamyeagah:Kubeb1012@service-ais-db.kzhk0wn.mongodb.net/?retryWrites=true&w=majority&appName=service-ais-db'
        uri: 'mongodb+srv://ayamyeagah:Kubeb1012@cluster0.fmes5hv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    },

    collection: {
        raw: 'raw',
        vessel: 'vessel',
        anomaly: 'anomaly',
        message: 'message',
        view: {
            latest: 'latest',
            traffic: 'traffic'
        },
        // test
        static: 'static',
        dynamic: 'dynamic'
    },

    tcp: {
        // host: '103.167.35.10',
        // port: 2567
        host: '103.24.49.246',
        port: 34567
    },

    amqp: {
        local: {
            uri: 'amqp://localhost',
            routingKey: 'nmea',
            exchange: 'dataExchange',
            infoQueue: 'rawQueue',
        },
        production: {
            host: 'labnav.my.id',
            uri: 'amqp://ayamyeagah:1012@labnav.my.id:5672',
            port: 5671,
            SSL: {
                ca: './ssl/ca_cert.pem',
                cert: './ssl/to/ca_cert.pem',
                key: './ssl/to/ca_cert.pem'
            },
            exchange: 'ais',
            routing: 'nmea',
            queue: 'station'
        }
    },

    app: {
        port: 3000
    }
}
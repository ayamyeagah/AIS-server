/* for config environment
migrate to .env, very soon.
*/

module.exports = {
    mongoose : {
        uri : 'mongodb+srv://ayamyeagah:Kubeb1012@service-ais-db.kzhk0wn.mongodb.net/raw?retryWrites=true&w=majority&appName=service-ais-db'
    },

    tcp : {
        host : '103.24.49.246',
        port : 34567
    },
    
    rabbitMQ : {
        uri : 'amqp://localhost',
        routingKey: 'nmea',
        exchange : 'dataExchange',
        infoQueue: 'rawQueue',
    },

    app : {
        port : 3000
    }
}
module.exports = {
    mongoose : {
        uri : 'mongodb+srv://ayamyeagah:Kubeb1012@cluster0.fmes5hv.mongodb.net/AIS',
        collection : 'rawdata'
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
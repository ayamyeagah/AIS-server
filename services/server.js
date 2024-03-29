// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// const Producer = require('./producer');
// const producer = new Producer();

// app.use(bodyParser.json('application/json'));

// app.post('/sendMsg', async (req, res, next)=> {
//     await producer.publishMsg(req.body.logType, req.body.message);
//     res.send();
// });

// app.listen(3000, () => {
//     console.log('Server started...')
// });

const config = require('../routes/config');
const connectTCP = require('./datastream');
const Producer = require('./producer');
const producer = new Producer();

const HOST = config.tcp.host;
const PORT = config.tcp.port;

connectTCP(PORT, HOST, data => {
    producer.publishMsg(config.rabbitMQ.routingKey, data);
});

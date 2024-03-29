const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Producer = require('./tcpPublisher');
const producer = new Producer();

app.use(bodyParser.json('application/json'));

app.post('/sendMsg', async (req, res, next)=> {
    await producer.publishMsg(req.body.logType, req.body.message);
    res.send();
});

app.listen(3000, () => {
    console.log('Server started...')
});
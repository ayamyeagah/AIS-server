/* script for starting message queueing protocol
*/

const config = require('../config/config');
const tcpDataConn = require('../utils/tcp-service');
const Producer = require('./producer');
const producer = new Producer();

const HOST = config.tcp.host;
const PORT = config.tcp.port;

tcpDataConn(PORT, HOST, data => {
    producer.publishMsg(config.amqp.local.routingKey, data);
});

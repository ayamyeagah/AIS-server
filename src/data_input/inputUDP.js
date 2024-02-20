const dgram = require('node:dgram');
const server = dgram.createSocket('udp4');

// for handle error
server.on('error', (err) => {
    console.error(`server error:\n${err.stack}`);
    server.close();
});

// read AIS data
server.on('message', (msg) => {
    console.log(`${msg}`);
});

// listen UDP port & ip
server.on('listening', () => {
    const address = server.address();
});

// UDP network available:
// port : 1001;9921;
// host : 103.24.49.246
server.bind(1001, '103.24.49.246');
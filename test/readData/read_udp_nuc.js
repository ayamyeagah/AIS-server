const dgram = require('dgram');
const server = dgram.createSocket('udp4');

/*
UDP network available:
port : 1001;9921;
host : 103.24.49.246
*/
const port = 1001;
const host = '103.24.46.246';

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

server.bind(port, host);
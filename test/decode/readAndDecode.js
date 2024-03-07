const net = require('net');
const split = require('split');
const AisDecoder = require('ais-stream-decoder');

const aisDecoder = new AisDecoder.default({ silent: true });

// Create a TCP client to connect to the server
const client = net.createConnection({ port: 2567, host: '103.167.35.10' }); // Adjust port and host as per your setup

client.on('connect', () => {
  console.log('Connected to TCP server');
});

// Pipe the TCP client stream through the split transform
client.pipe(split())
  .on('data', line => {
    // Decode each line of data received
    const decodedMessage = aisDecoder.write(line.toString());
    console.log('Decoded message:', decodedMessage);
  });

// aisDecoder.on('data', decodedMessage => {
//   console.log(decodedMessage);
// });

client.on('error', err => {
  console.error('Error:', err);
});

client.on('close', () => {
  console.log('Connection closed');
});

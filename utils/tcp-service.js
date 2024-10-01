// const net = require('net');
// const split = require('split');

// function tcpDataConn(port, host, onDataReceived) {
//     const clientSocket = new net.Socket();

//     clientSocket.connect(port, host, () => {
//         console.log('Connected to TCP server');
//     });

//     clientSocket
//         .pipe(split())
//         .on('data', data => {
//             onDataReceived(data.toString());
//         });

//     clientSocket.on('close', () => {
//         console.log('Connection to TCP server closed');
//     });

//     clientSocket.on('error', err => {
//         console.error('Socket error:', err);
//     });

//     return clientSocket;
// }

// module.exports = tcpDataConn;

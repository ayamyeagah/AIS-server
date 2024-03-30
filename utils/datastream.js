const net = require('net');
const split = require('split');

// Function to connect to TCP server using a socket
function connectTCP(port, host, onDataReceived) {
    const clientSocket = new net.Socket();

    // Connect to the TCP server
    clientSocket.connect(port, host, () => {
        console.log('Connected to TCP server');
    });

    // Pipe the TCP client stream through the split transform
    clientSocket
        .pipe(split())
        .on('data', data => {   
            // Data received stored to onDataReceived variable
            onDataReceived(data.toString());
    });

    // Event handler for socket close
    clientSocket.on('close', () => {
        console.log('Connection to TCP server closed');
    });

    // Event handler for socket error
    clientSocket.on('error', err => {
        console.error('Socket error:', err);
    });

    return clientSocket;
}

module.exports = connectTCP;

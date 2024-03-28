const net = require('net');

// Function to create and start TCP server
function startTCPServer(port, onDataReceived) {
    const server = net.createServer(socket => {
        console.log('Client connected');

        // Event handler for incoming data from TCP client
        socket.on('data', data => {
            onDataReceived(data.toString());
        });

        // Event handler for client disconnect
        socket.on('end', () => {
            console.log('Client disconnected');
        });
    });

    // Start TCP server
    server.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

module.exports = startTCPServer;

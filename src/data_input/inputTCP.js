const net = require('node:net');

const server = net.createServer((socket) => {
  socket.on('data', (data) => {
    console.log('Received data from client:', data.toString());
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});

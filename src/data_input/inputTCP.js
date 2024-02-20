const net = require('net');
// available port & host
// port = 6677
// host = '127.0.0.4'
const port = 6677;
const host = '127.0.0.4';

// server start & listening
const server = net.createServer();
server.listen(port, host, () => {
  console.log(`Server listening on ${host}:${port}`);
});

let sockets = [];

server.on('connection', function(sock) {
  // ensure if connected to host & port
  console.log(`CONNECTED: ${sock.remoteAddress}:${sock.remotePort}`);
  sockets.push(sock);
  
  // read data
  sock.on('data', function(data) {
    console.log(`${data}`);
  });
});
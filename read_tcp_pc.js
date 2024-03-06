/*
IP PUBLIC AIS
- SBY, SEMARANG, BATAM
    HOST: 103.24.49.246
    PORT: 34567
- SBY ONLY
    HOST: 103.167.35.10
    PORT: 2567
*/

const net = require('net');
const HOST = '103.167.35.10';
const PORT = 2567;
 
const sock = new net.Socket();

sock.connect(PORT, HOST, () => {
  console.log('CONNECTED TO ' + HOST + ':' + PORT);
});

sock.on('data', (data) => {
  console.log(data.toString());
});

// sock.on('data', async (data) => {
//   try {
//     const nmea = data.toString();
//     const product = new Product ({nmea});
//     await product.save()
//     console.log('saved: ', nmea);
//   }
//   catch (error) {
//     console.error(error.message);
//     process.exit(1);
//   }
// });

sock.on('close', () => {
  console.log('CONNECTION CLOSED');
});

sock.on('error', (err) => {
  console.error('Error: ' + err.message);
});

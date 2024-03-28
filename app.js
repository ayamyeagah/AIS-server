const connectDB = require('./database/connectDB');
const connectToTCPServer = require('./services/datastream');
const NMEADecoder = require('./decoder');
const config = require('./config');

// TCP server configuration
const PORT = config.tcp.port;
const HOST = config.tcp.host;

const nmeaDecoder = new NMEADecoder();

// Connect to MongoDB
connectDB()
    .then(db => {
        if (db) {
            // Start TCP server
            connectToTCPServer(PORT, HOST, nmea => {
                // Write the NMEA AIS message to the decoder
                nmeaDecoder.write(nmea);
            });
        } else {
            console.error('Failed to connect to MongoDB');
        }
    })
    .catch(err => {
        console.error('Error:', err);
    });
    
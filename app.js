const connectDB = require('./database/connect');
const storeInDB = require('./database/storeData');
const connectToTCPServer = require('./data-connection/TCPAsClient');
const NMEADecoder = require('./decoder');

// TCP server configuration
const PORT = 2567;
const HOST = '103.167.35.10'

// Connect to MongoDB
connectDB()
    .then(db => {
        if (db) {
            // Start TCP server
            connectToTCPServer(PORT, HOST, nmea => {
                // Write the NMEA AIS message to the decoder
                NMEADecoder(nmea, message => {
                    storeInDB(message);
                });
                // Store the decoded message in MongoDB (if required)
                // Example: db.collection('ais_messages').insertOne(decodedMessage);
                console.log(nmea);
            });
        } else {
            console.error('Failed to connect to MongoDB');
        }
    })
    .catch(err => {
        console.error('Error:', err);
    });
    
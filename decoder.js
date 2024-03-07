const AisDecoder = require('ais-stream-decoder');

// Create an instance of the AIS decoder
const aisDecoder = new AisDecoder.default();

function NMEADecoder(nmea, message) {
    // Event handler for errors
    aisDecoder.on('error', err => {
        console.error(err);
    });
    
    // Event handler for decoded AIS messages
    aisDecoder.on('data', decodedMessage => {
        message(decodedMessage);
    });
    
    // Write NMEA AIS message to decoder
    aisDecoder.write(nmea);
}

module.exports = NMEADecoder;

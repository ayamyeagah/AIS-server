const AisDecoder = require('ais-stream-decoder');
// const storeInDB = require('../database/storeDB');

class NMEADecoder {
    constructor(options = {}) {
        // Create an instance of the AIS decoder
        this.aisDecoder = new AisDecoder.default({ silent: options.silent || true });

        // Event handler for errors
        this.aisDecoder.on('error', err => {
            console.error(err);
        });

        // Event handler for decoded AIS messages
        this.aisDecoder.on('data', decodedMessage => {
            this.handleDecodedMessage(decodedMessage);
        });
    }

    // Method to write NMEA AIS message to decoder
    write(nmea) {
        this.aisDecoder.write(nmea);
    }

    // Method to handle decoded AIS message
    handleDecodedMessage(decodedMessage) {
        // Decoded AIS message stored to database
        const decodedResult = JSON.parse(decodedMessage)
        // storeInDB(decodedResult);
        console.log(decodedResult);
    }
}

module.exports = NMEADecoder;

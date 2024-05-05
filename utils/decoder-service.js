/*  utils for handling decode data from nmea format to ais messages
*/

const AisDecoder = require('ais-stream-decoder');
const EventEmitter = require('events');
// const storeInDB = require('../database/storeDB');

class NMEADecoder extends EventEmitter {
    constructor(options = {}) {
        super();

        // Create an instance of the AIS decoder
        this.aisDecoder = new AisDecoder.default({ silent: options.silent || true });

        // Event handler for errors
        this.aisDecoder.on('error', err => {
            console.error(err);
            this.emit('error', err);
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
        const aisMsg = JSON.parse(decodedMessage);
        // const aisMsg = decodedMessage;
        // storeInDB(decodedResult);
        // console.log(decodedResult);
        this.emit('decoded', aisMsg);
    }
}

module.exports = NMEADecoder;

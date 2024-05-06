/*  utils for handling decode data from nmea format to ais messages
*/

const AisDecoder = require('ais-stream-decoder');
const { rejects } = require('assert');
const { resolve } = require('path');

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
        return new Promise((resolve, rejects) => {
            // Event handler for resolving Promise when data received
            this.handleDecodedMessage = (decodedMessage) => {
                const aisMsg = JSON.parse(decodedMessage);
                resolve(aisMsg);
            };
            this.aisDecoder.write(nmea);
        });
    }
}

module.exports = NMEADecoder;

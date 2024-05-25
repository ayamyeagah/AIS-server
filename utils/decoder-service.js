/*  utils for handling decode data from nmea format to ais messages
*/

const AisDecoder = require('ais-stream-decoder');

class NMEADecoder {
    constructor(options = {}) {
        this.aisDecoder = new AisDecoder.default({ silent: options.silent || true });

        this.aisDecoder.on('error', err => {
            console.error('AIS Decoder Error:', err);
        });

        this.aisDecoder.on('data', decodedMessage => {
            if (this.handleDecodedMessage) {
                this.handleDecodedMessage(decodedMessage);
            }
        });
    }

    write(nmea) {
        return new Promise((resolve, reject) => {
            this.handleDecodedMessage = (decodedMessage) => {
                try {
                    const aisMsg = JSON.parse(decodedMessage);
                    resolve(aisMsg);
                } catch (error) {
                    reject(error);
                }
            };
            this.aisDecoder.write(nmea);
        });
    }
}

module.exports = NMEADecoder;

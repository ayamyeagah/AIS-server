/* for test only
migrate to specific rules, very soon.
*/

const Consumer = require('../services/consumer');
const sentencesData = require('./raw');
const aisMessageData = require('./message');
const conn = require('./db-conn');
const NMEADecoder = require('../utils/decoder-service');
const decoder = new NMEADecoder();

async function clean() {
    try {
        const db = conn();
        if (!db) {
            console.error('Database connection is not established.');
            return;
        }

        await Consumer((nmea) => {
            decoder.write(nmea)
                .then(aisMsg => {
                    // sentencesData(aisMsg);
                    aisMessageData(aisMsg);
                });
        });
    } catch (error) {
        console.error();
    }
}

clean().catch(console.error);
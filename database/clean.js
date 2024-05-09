/* for test only
migrate to specific rules, very soon.
*/

const Consumer = require('../services/consumer');
const NMEADecoder = require('../utils/decoder-service');
const decoder = new NMEADecoder();
const conn = require('./db-conn');
const sentencesData = require('./raw');
const aisMessageData = require('./message');
const saveTypes = require('./static-dynamic');
// const latest = require('./view');

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

        saveTypes();

    } catch (error) {
        console.error();
    }
};

clean().catch(console.error);
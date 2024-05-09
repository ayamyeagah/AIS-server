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

        // view
        db.createView("latest", "dynamic", [
            {
                $lookup: {
                    from: "static",
                    localField: "mmsi",
                    foreignField: "mmsi",
                    as: "static"
                }
            },
            {
                $unwind: {
                    path: "$static",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    mmsi: 1,
                    shipName: {
                        $cond: {
                            if: { $eq: ["$type", 8] },
                            then: { $ifNull: ["$static.shipName", "$shipName"] },
                            else: "$shipName"
                        }
                    },
                    lat: 1,
                    lon: 1,
                    vesselType: {
                        $cond: {
                            if: { $eq: ["$type", 8] },
                            then: { $ifNull: ["$static.vesselType", "$vesselType"] },
                            else: "$vesselType"
                        }
                    }
                }
            }
        ]);
    } catch (error) {
        console.error();
    }
};

clean().catch(console.error);
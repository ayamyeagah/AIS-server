const Recents = require('../../models/recents.schema');

const updateLatestDynamic = async (message) => {
    const bulkOpsDynamic = message.map(dynamicUpdate => ({
        updateOne: {
            filter: { mmsi: dynamicUpdate.mmsi },
            update: {
                $set: {
                    dynamic: dynamicUpdate,
                    location: {
                        type: "Point",
                        coordinates: [dynamicUpdate.lon, dynamicUpdate.lat]
                    }
                },
                $setOnInsert: {
                    static: {},
                    name: "Unknown",
                    type: 0
                }
            },
            upsert: true
        }
    }));

    await Recents.bulkWrite(bulkOpsDynamic);
    // console.log('Updated Dynamic in Latest');
};

module.exports = updateLatestDynamic;
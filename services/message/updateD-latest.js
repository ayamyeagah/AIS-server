const Recents = require('../../models/recents.schema');

const updateLatestDynamic = async (message) => {
    const bulkOpsDynamic = message.map(dynamicUpdate => {
        const update = {
            $set: {
                dynamic: dynamicUpdate
            },
            $setOnInsert: {
                static: {},
                name: "Unknown",
                type: 0
            }
        };

        if (dynamicUpdate.lon !== null && dynamicUpdate.lat !== null) {
            update.$set.location = {
                type: "Point",
                coordinates: [dynamicUpdate.lon, dynamicUpdate.lat]
            };
        }

        return {
            updateOne: {
                filter: { mmsi: dynamicUpdate.mmsi },
                update: update,
                upsert: true
            }
        };
    });

    await Recents.bulkWrite(bulkOpsDynamic);
    // console.log('Updated Dynamic in Latest');
};

module.exports = updateLatestDynamic;
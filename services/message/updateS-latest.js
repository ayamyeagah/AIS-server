const Recents = require('../../models/recents.schema');

const updateLatestStatic = async (message) => {
    const bulkOpsStatic = message.map(staticUpdate => ({
        updateOne: {
            filter: { mmsi: staticUpdate.mmsi },
            update: {
                $set: {
                    static: staticUpdate,
                    name: staticUpdate.name,
                    type: staticUpdate.typeAndCargo
                },
                $setOnInsert: {
                    dynamic: {},
                    coordinates: {
                        type: "Point",
                        coordinates: [staticUpdate.lon, staticUpdate.lat]
                    }
                }
            },
            upsert: true
        }
    }));

    await Recents.bulkWrite(bulkOpsStatic);
    console.log('Updated Static in Latest');
};

module.exports = updateLatestStatic;
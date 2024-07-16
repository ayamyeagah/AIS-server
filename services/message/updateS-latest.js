const Recents = require('../../models/recents.schema');

const updateLatestStatic = async (message) => {
    const bulkOpsStatic = message.map(staticUpdate => {
        const update = {

            $set: {
                static: staticUpdate,
                name: staticUpdate.name,
                type: staticUpdate.typeAndCargo
            },
            $setOnInsert: {
                dynamic: {}
            }
        };

        if (staticUpdate.lon !== null && staticUpdate.lat !== null) {
            update.$setOnInsert.coordinates = {
                type: "Point",
                coordinates: [staticUpdate.lon, staticUpdate.lat]
            };
        }

        return {
            updateOne: {
                filter: { mmsi: staticUpdate.mmsi },
                update: update,
                upsert: true
            }
        };
    });

    await Recents.bulkWrite(bulkOpsStatic);
    // console.log('Updated Static in Latest');
};

module.exports = updateLatestStatic;
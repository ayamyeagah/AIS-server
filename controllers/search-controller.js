const Recents = require('../models/recents.schema');

const getLocationByMMSI = async (req, res) => {
    const mmsi = req.params.mmsi;
    try {
        const vesselLocation = await Recents.findOne({ mmsi: mmsi });
        if (vesselLocation) {
            res.status(200).json({ lon: vesselLocation.dynamic.lon, lat: vesselLocation.dynamic.lat });
        } else {
            res.status(404).send('Vessel not found');
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

module.exports = getLocationByMMSI;
const Static = require('../models/static.schema');
const Recents = require('../models/recents.schema');

const getVessels = async (req, res) => {
    try {
        const vessels = await Static.find({}, 'mmsi imo name typeAndCargo');
        res.status(200).json(vessels);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

const getTotalVessels = async (req, res) => {
    try {
        const vessels = await Recents.countDocuments();
        res.status(200).json(vessels);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

module.exports = { getVessels, getTotalVessels };

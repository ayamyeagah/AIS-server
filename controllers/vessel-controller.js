const Static = require('../models/static.schema');
const Recents = require('../models/recents.schema');

const getVessels = async (req, res) => {
    try {
        // const vessels = await Static.find({}, 'mmsi imo name typeAndCargo');
        const vessels = await Static.aggregate([
            {
                $group: {
                    _id: "$mmsi",
                    mmsi: { $first: "$mmsi" },
                    imo: { $first: "$imo" },
                    name: { $first: "$name" },
                    typeAndCargo: { $first: "$typeAndCargo" }
                }
            },
            {
                $project: {
                    _id: 0,
                    mmsi: 1,
                    imo: 1,
                    name: 1,
                    typeAndCargo: 1
                }
            }
        ]);
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

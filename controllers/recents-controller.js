const Recents = require('../models/recents.schema');

const getLatest = async (req, res) => {
    try {
        const recents = await Recents.find({});
        res.status(200).json(recents);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

module.exports = getLatest;

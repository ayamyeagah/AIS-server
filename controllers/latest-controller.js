/* Controller for latest message
*/

const Latest = require('../models/latest.schema');

const getLatest = async (req, res) => {
    try {
        // const recents = await db.latest.aggregate({ $sort: { _id: -1 } });
        const recents = await Latest.find({});
        res.status(200).json(recents);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

module.exports = getLatest;
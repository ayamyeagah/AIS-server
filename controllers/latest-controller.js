/* Controller for latest message
*/

const Latest = require('../models/latest.schema');
const Dynamic = require('../models/dynamic.schema');
const pipeline = require('../database/latest-pipeline');

const performAggregation = async () => {
    return await Dynamic.aggregate(pipeline);
};

const getLatest = async (req, res) => {
    try {
        // const recents = await Latest.find({});
        // const recents = await Dynamic.aggregate(pipeline);
        const recents = await performAggregation();
        res.status(200).json(recents);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

const periodicAggregation = async () => {
    try {
        const latest = await performAggregation();
        const totalDataCount = latest.length;
        // console.log('Periodic aggregation result:', latest);
        // console.log('Total data count:', totalDataCount);
    } catch (error) {
        console.error('Periodic aggregation error:', error.message);
    }
};

const intervalInMillis = 5000; // 5 seconds

setInterval(periodicAggregation, intervalInMillis);

module.exports = getLatest;

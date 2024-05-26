/* Controller for latest message
*/

const Latest = require('../models/latest.schema');
const Dynamic = require('../models/dynamic.schema');
const pipeline = require('../database/latest-pipeline');

const getLatest = async (req, res) => {
    try {
        // const recents = await Latest.find({});
        const recents = await Dynamic.aggregate(pipeline);
        res.status(200).json(recents);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

module.exports = getLatest;

// const pipeline = [
//     {
//         '$lookup': {
//             'from': 'static',
//             'localField': 'mmsi',
//             'foreignField': 'mmsi',
//             'as': 'static_docs'
//         }
//     }, {
//         '$unwind': {
//             'path': '$static_docs',
//             'preserveNullAndEmptyArrays': true
//         }
//     }, {
//         '$group': {
//             '_id': '$mmsi',
//             'latestDynamic': {
//                 '$max': {
//                     '$cond': {
//                         'if': {
//                             '$gt': [
//                                 '$createdAt', '$static_docs.createdAt'
//                             ]
//                         },
//                         'then': '$$ROOT',
//                         'else': '$$ROOT'
//                     }
//                 }
//             },
//             'latestStatic': {
//                 '$max': {
//                     '$cond': {
//                         'if': {
//                             '$lte': [
//                                 '$createdAt', '$static_docs.createdAt'
//                             ]
//                         },
//                         'then': '$static_docs',
//                         'else': '$static_docs'
//                     }
//                 }
//             }
//         }
//     }, {
//         '$project': {
//             '_id': 1,
//             'dynamic': '$latestDynamic',
//             'static': '$latestStatic'
//         }
//     }
// ]

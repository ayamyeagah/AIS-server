/* Controller for latest message
*/

const Latest = require('../models/latest.schema');
const Dynamic = require('../models/dynamic.schema');

const getLatest = async (req, res) => {
    try {
        // const recents = await Latest.find({});
        const recents = await Dynamic.aggregate(pipeline);
        res.status(200).json(recents);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

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

const now = new Date();
const last24Hours = new Date(now.getTime() - 48 * 60 * 60 * 1000);

const pipeline = [
    {
        $match: {
            createdAt: {
                $gte: last24Hours,
                $lt: now
            }
        }
    },
    {
        $sort: {
            mmsi: -1
        }
    },
    {
        $group: {
            _id: "$mmsi",
            lon: {
                $last: "$lon"
            },
            lat: {
                $last: "$lat"
            },
            createdAt: {
                $last: "$createdAt"
            }
        }
    },
    {
        $lookup: {
            from: "static",
            localField: "_id",
            foreignField: "mmsi",
            as: "shipDetails"
        }
    },
    {
        $unwind: {
            path: "$shipDetails",
            preserveNullAndEmptyArrays: true
        }
    },
    {
        $group: {
            _id: "$_id",
            lon: {
                $first: "$lon"
            },
            lat: {
                $first: "$lat"
            },
            createdAt: {
                $first: "$createdAt"
            },
            shipDetails: {
                $first: "$shipDetails"
            }
        }
    },
    {
        $addFields: {
            name: {
                $ifNull: ["$shipDetails.name", "Unknown"]
            },
            type: {
                $ifNull: ["$shipDetails.typeAndCargo", 0]
            },
            lastReceived: {
                $let: {
                    vars: {
                        diff: {
                            $divide: [
                                {
                                    $subtract: [
                                        "$$NOW",
                                        "$createdAt"
                                    ]
                                },
                                60000
                            ]
                        }
                    },
                    in: {
                        $concat: [
                            {
                                $toString: {
                                    $floor: {
                                        $divide: ["$$diff", 60]
                                    }
                                }
                            },
                            " hours, ",
                            {
                                $toString: {
                                    $round: [
                                        {
                                            $mod: ["$$diff", 60]
                                        },
                                        0
                                    ]
                                }
                            },
                            " minutes ago"
                        ]
                    }
                }
            }
        }
    },
    {
        $project: {
            _id: 1,
            name: 1,
            type: 1,
            lon: 1,
            lat: 1,
            lastReceived: 1
        }
    }
];

module.exports = getLatest;
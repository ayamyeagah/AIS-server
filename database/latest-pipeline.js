/**
 * Pipeline for latest
 */

const now = new Date();
const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);

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

module.exports = pipeline;
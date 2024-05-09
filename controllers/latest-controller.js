/* Controller for latest message
*/

const latest = db.createView("latest", "dynamic", [
    {
        $lookup: {
            from: "static",
            localField: "mmsi",
            foreignField: "mmsi",
            as: "static"
        }
    },
    {
        $unwind: {
            path: "$static",
            preserveNullAndEmptyArrays: true
        }
    },
    {
        $project: {
            mmsi: 1,
            shipName: {
                $cond: {
                    if: { $eq: ["$type", 8] },
                    then: { $ifNull: ["$static.shipName", "$shipName"] },
                    else: "$shipName"
                }
            },
            lat: 1,
            lon: 1,
            vesselType: {
                $cond: {
                    if: { $eq: ["$type", 8] },
                    then: { $ifNull: ["$static.vesselType", "$vesselType"] },
                    else: "$vesselType"
                }
            }
        }
    }
]);
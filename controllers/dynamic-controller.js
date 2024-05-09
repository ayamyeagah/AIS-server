/* Controller for dynamic data
*/

const Message = require('../models/message.schema');

module.exports = async function dynamicData() {
    try {
        // Group and aggregate data with dynamic types
        const pipeline = [
            {
                $match: { type: { $in: [1, 2, 3, 4, 18] } }
            },
            {
                $merge: {
                    into: "dynamic",
                    on: "_id",
                    whenMatched: "replace",
                    whenNotMatched: "insert"
                }
            }
        ];

        await Message.aggregate(pipeline);

    } catch (error) {
        console.error('Error for find type in db.message:', error);
    }
};

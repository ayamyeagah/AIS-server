/* Controller for static data
*/

const Message = require('../models/message.schema');

module.exports = async function staticData() {
    try {
        // Group and aggregate data with static types
        const pipeline = [
            {
                $match: { type: { $in: [5, 8, 24] } }
            },
            {
                $merge: {
                    into: "static",
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

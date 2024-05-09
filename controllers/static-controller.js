/* Controller for static data
*/

const conn = require('../database/db-conn');
const Message = require('../models/message.schema');
const Static = require('../models/static.schema');

async function staticData() {
    try {
        const db = conn();
        // find all data with static types
        const query = { type: { $in: [5, 8, 24] } };
        const staticTypes = Message.find(query);

        // assign data to array
        const docs = [];
        for await (const doc of staticTypes) {
            docs.push(doc);
        }

        // save to dynamic collection
        await Static.insertMany(docs);
    } catch (error) {
        console.error('Error for find type in db.message:', error);
    }
};

staticData().catch(console.error());
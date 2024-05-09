/* Controller for dynamic data
*/

const conn = require('../database/db-conn');
const Message = require('../models/message.schema');
const Dynamic = require('../models/dynamic.schema');

async function dynamicData() {
    try {
        const db = conn();
        // find all data with dynamic types
        const query = { type: { $in: [1, 2, 3, 4, 18] } };
        const dynamicTypes = Message.find(query);

        // assign data to array
        const docs = [];
        for await (const doc of dynamicTypes) {
            docs.push(doc);
        }

        // save to dynamic collection
        await Dynamic.insertMany(docs);
    } catch (error) {
        console.error('Error for find type in db.message:', error);
    }
};

dynamicData().catch(console.error());
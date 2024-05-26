const conn = require('./db-conn');
const Static = require('../models/static.schema');
const Dynamic = require('../models/dynamic.schema');
const Message = require('../models/message.schema');

async function deleteCollection() {
    try {
        conn();
        await Message.deleteMany({});
    } catch (err) {
        console.error('Error delete in collection', err);
    }
};

deleteCollection();
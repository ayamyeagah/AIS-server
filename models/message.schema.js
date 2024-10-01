const config = require('../config/config');
const mongoose = require('mongoose');
const Int32 = require('mongoose-int32').loadType(mongoose);

const messageSchema = new mongoose.Schema(
    {
        type: {
            type: Int32,
            required: true
        },
        channel: {
            type: String,
            required: true
        },
        repeat: {
            type: Int32,
            required: true
        },
        mmsi: {
            type: Int32,
            required: true
        },
        sentences: {
            type: [String],
            required: true
        }
    },
    {
        strict: false,
        timestamps: true
    }
);

const Message = mongoose.model(
    config.collection.message,
    messageSchema,
    config.collection.message
);

module.exports = Message;
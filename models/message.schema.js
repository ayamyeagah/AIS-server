/* schema for stored all message received
*/

const config = require('../config/config');
const mongoose = require('mongoose');
const Int32 = require('mongoose-int32').loadType(mongoose);
const Double = require('@mongoosejs/double');

const messageSchema = new mongoose.Schema(
    {
        // mandatory params
        // _id: {
        //     type: mongoose.ObjectId,
        //     required: true
        // },
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
/* schema for stored all message received
*/

const config = require('../config/config');
const mongoose = require('mongoose');
const Int32 = require('mongoose-int32').loadType(mongoose);
const Double = require('@mongoosejs/double');

const messageSchema = new mongoose.Schema(
    {
        // mandatory params
        _id: {
            type: mongoose.ObjectId,
            required: true
        },
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
        sentence: {
            type: [String],
            required: true
        },

        // // type 1,2,3
        // navstatus: {
        //     type: Int32
        // },
        // rot: {
        //     type: Int32
        // },
        // sog: {
        //     type: Double
        // },
        // cog: {
        //     type: Double
        // },
        // accuracy: {
        //     type: Boolean
        // },
        // lat: {
        //     type: Double
        // },
        // lon: {
        //     type: Double
        // },
        // heading: {
        //     type: Int32
        // },
        // utc: {
        //     type: Int32
        // },
        // spec_manouvre: {
        //     type: Int32
        // },
        // raim: {
        //     type: Int32
        // },
        // radio: {
        //     type: Int32
        // },

    },
    {
        timestamps: true
    }
);

const Message = mongoose.model(
    config.collection.message,
    messageSchema,
    config.collection.message
);

module.exports = Message;
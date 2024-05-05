// schema for reference

const mongoose = require('mongoose');
const config = require('../config/config');

// Define the schema for decoded messages
const messageSchema = new mongoose.Schema(
    {
        type: Number, 
        channel: String,
        repeat: Number,
        mmsi: Number,
        navStatus: Number,
        rateOfTurn: Number,
        speedOverGround: Number,
        accuracy: Boolean,
        lon: Number,
        lat: Number,
        courseOverGround: Number,
        heading: Number,
        utcSecond: Date,
        specialManoeuvre: Number,
        raim: Boolean,
        radio: Number,
        sentences: [String]
    },
    {
        timestamps: true
    }
);
const MessageSchema = mongoose.model(
    config.mongoose.collection,
    messageSchema,
    config.mongoose.collection
);

module.exports = MessageSchema;

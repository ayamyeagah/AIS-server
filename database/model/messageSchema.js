const mongoose = require('mongoose');

// Define the schema for decoded messages
const messageSchema = new mongoose.Schema({
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
});
const MessageSchema = mongoose.model('rawdata', messageSchema, 'rawdata');

module.exports = MessageSchema;

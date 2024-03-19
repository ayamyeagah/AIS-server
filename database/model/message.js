const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema ({
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
    utcSecond: Number,
    specialManoeuver: Number,
    raim: Boolean,
    radio: Number,
    sentences: Array
});

module.exports = mongoose.model('Message', messageSchema);

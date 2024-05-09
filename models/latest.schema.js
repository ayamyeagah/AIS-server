/* create view / schema for main purpose.
collection utama yang digunakan untuk menampilkan ke front end
*/

const config = require('../config/config')
const mongoose = require('mongoose');

const latestSchema = new mongoose.Schema(
    {
        lat: Number,
        lon: Number
    },
    {
        autoCreate: false,
        autoIndex: false
    }
);

const Latest = mongoose.model(
    config.collection.latest,
    latestSchema,
    config.collection.latest
);

module.exports = Latest;
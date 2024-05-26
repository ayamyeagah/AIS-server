/* create view / schema for main purpose.
collection utama yang digunakan untuk menampilkan ke front end
*/

const config = require('../config/config')
const mongoose = require('mongoose');
const Int32 = require('mongoose-int32').loadType(mongoose);

const latestSchema = new mongoose.Schema(
    {
        _id: Int32,
        lat: Number,
        lon: Number,
        name: {
            type: String,
            uppercase: true
        },
        createdAt: Date

    },
    {
        autoCreate: false,
        autoIndex: false
    }
);

const Latest = mongoose.model(
    config.collection.view.latest,
    latestSchema,
    config.collection.view.latest
);

module.exports = Latest;
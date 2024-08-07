/* create view / schema for main purpose.
collection utama yang digunakan untuk menampilkan ke front end
*/

const config = require('../config/config')
const mongoose = require('mongoose');

const latestSchema = new mongoose.Schema(
    {
        _id: {
            type: Number,
            required: true
        },
        dynamic: {
            type: Object,
            required: true
        },
        static: {
            type: Object,
            required: true
        },
        coordinates: {
            type: {
                type: String,
                enum: ['Point'],
                required: true
            },
            coordinates: {
                type: [Number],
                required: true
            }
        }

    }
);

const Latest = mongoose.model(
    config.collection.view.latest,
    latestSchema,
    config.collection.view.latest
);

module.exports = Latest;
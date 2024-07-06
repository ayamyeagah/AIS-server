/* create view / schema for main purpose.
collection for test
*/

const config = require('../config/config')
const mongoose = require('mongoose');

const recentsSchema = new mongoose.Schema(
    {
        mmsi: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        type: {
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
        location: {
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

Recents = mongoose.model(
    'recents',
    recentsSchema,
    'recents'
);

module.exports = Recents;
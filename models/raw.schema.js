/* schema for raw ais (nmea)
*/

const config = require('../config/config');
const mongoose = require('mongoose');

const rawSchema = new mongoose.Schema(
    {
        raw: {
            type: String,
            required: true
        },
        port: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Raw = mongoose.model(
    config.collection.raw,
    rawSchema,
    config.collection.raw
);

module.exports = Raw;

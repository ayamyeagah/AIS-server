/* schema for all vessel (static data)
*/

const config = require('../config/config');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const vesselSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: true,
            unique: true
        },
        IMO: {
            type: String,
            required: true
        },
        MMSI: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function (v) {
                    return /^\d{9}$/.test(v);
                },
                message: props => `${props.value} is not a valid MMSI number!`
            }
        },
        FLAG: {
            type: String,
            required: true
        },
        FLAGNAME: {
            type: String,
            required: true
        },
        NAME: {
            type: String,
            required: true
        },
        TYPE: {
            type: String,
            required: true
        },
        TYPENAME: {
            type: String,
            required: true
        },
        CALLSIGN: {
            type: String,
            required: true
        }
    },
    {
        _id: false
    }
);

// mmsi as _id
vesselSchema.pre('save', function (next) {
    if (!this._id && this.MMSI) {
        this._id = this.MMSI;
    }
    next();
});

vesselSchema.plugin(uniqueValidator);

const Vessel = mongoose.model(
    config.collection.vessel,
    vesselSchema,
    config.collection.vessel
);

module.exports = Vessel;

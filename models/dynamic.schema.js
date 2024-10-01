const config = require('../config/config');
const mongoose = require('mongoose');
const Int32 = require('mongoose-int32').loadType(mongoose);

const dynamicSchema = new mongoose.Schema(
    {
        // Mandatory params
        type: {
            type: Int32,
            required: true
        },
        mmsi: {
            type: Int32,
            required: true
        },

        // type: 1,2,3
        navStatus: Int32,
        rateOfTurn: Number,
        speedOverGround: Number,
        accuracy: Boolean,
        lon: Number,
        lat: Number,
        courseOverGround: Number,
        heading: Number,
        utcSecond: Int32,
        specialManouvre: Int32,
        raim: Boolean,
        radio: Int32,

        // type: 4
        year: Int32,
        month: Int32,
        day: Int32,
        hour: Int32,
        minute: Int32,
        second: Int32,
        epfd: Number,

        // type: 8
        dac: Number,
        fid: Number,

        // type: 8 (instatic land)
        eni: String,
        length: Number,
        beam: Number,
        shipType: Int32,
        hazardCode: Int32,
        draught: Number,
        loadStatus: Int32,
        speedQuality: Boolean,
        courseQuality: Boolean,
        headingQuality: Boolean,

        // type: 18
        regional: Int32,
        unitFlag: Boolean,
        displayFlag: Boolean,
        dscFlag: Boolean,
        bandFlag: Boolean,
        msg22Flag: Boolean,
        modeFlag: Boolean,
    },
    {
        timestamps: true
    }
);

const Dynamic = mongoose.model(
    config.collection.dynamic,
    dynamicSchema,
    config.collection.dynamic
);

module.exports = Dynamic;
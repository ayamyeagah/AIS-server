/* Schema for dynamic collection (type: 1,2,3,4,8,18) 
*/

const config = require('../config/config');
const mongoose = require('mongoose');
const Int32 = require('mongoose-int32').loadType(mongoose);
const Double = require('@mongoosejs/double');

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
        rateOfTurn: Double,
        speedOverGround: Double,
        accuracy: Boolean,
        lon: Double,
        lat: Double,
        courseOverGround: Double,
        heading: Double,
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
        epfd: Double,

        // type: 8
        dac: Double,
        fid: Double,

        // type: 8 (instatic land)
        eni: String,
        length: Double,
        beam: Double,
        shipType: Int32,
        hazardCode: Int32,
        draught: Double,
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
    }
);

const Dynamic = mongoose.model(
    config.collection.dynamic,
    dynamicSchema,
    config.collection.dynamic
);

module.exports = Dynamic;
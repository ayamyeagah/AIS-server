/* Schema for static collection (type: 5 & 24)
*/

const config = require('../config/config');
const mongoose = require('mongoose');
const Int32 = require('mongoose-int32').loadType(mongoose);

const staticSchema = new mongoose.Schema(
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

        // type: 5
        aisVersion: Int32,
        imo: String,
        callSign: String,
        name: String,
        typeAndCargo: Int32,
        dimBow: Number,
        dimStern: Number,
        dimPort: Number,
        dimStarboard: Number,
        epfd: Number,
        etaMonth: Int32,
        etaDay: Int32,
        etaHour: Int32,
        etaMinutes: Int32,
        draught: Number,
        destination: String,
        dte: Boolean,

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

        // type: 24
        partNum: Int32,
        vendorId: String,
        model: Int32,
        serial: Int32,
        mothershipMMSI: Int32
    },
    {
        // strict: false,
        timestamps: true
    }
);

const Static = mongoose.model(
    config.collection.static,
    staticSchema,
    config.collection.static
);

module.exports = Static;
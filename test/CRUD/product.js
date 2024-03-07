const mongoose = require('mongoose');

const productSchema = new mongoose.Schema ({
    nmea: {
        type: String,
        required: true
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
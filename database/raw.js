const config = require('../config/config');
const Raw = require('../models/raw.schema');
const mongoose = require('mongoose');

const saveRaw = async (sentences) => {
    try {
        const raw = new Raw({
            _id: new mongoose.Types.ObjectId(),
            raw: sentences.join(),
            port: '1'
        });

        await raw.save();
        console.log('Saved');
    } catch (error) {
        console.error('Error saving data:', error);
    }
};

const sentencesData = (data) => {
    if (data && data.sentences) {
        saveRaw(data.sentences);
    } else {
        console.log('No sentences found in data');
    }
};

module.exports = sentencesData;

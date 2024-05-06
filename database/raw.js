const config = require('../config/config');
const Raw = require('../models/raw.schema');
const mongoose = require('mongoose');

const saveRaw = async (sentences) => {
    try {
        // Mapping array [sentences] into array from object document
        const documents = sentences.map(sentence => ({
            raw: sentence,
            port: '1'
        }));

        // Save documents
        const results = await Raw.insertMany(documents);
        console.log('Saved', results);
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

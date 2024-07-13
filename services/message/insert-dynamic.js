const Dynamic = require('../../models/dynamic.schema');
const updateLatestDynamic = require('./updateD-latest');

const saveDynamic = async (messages) => {
    let dynamicData = messages.filter(data => dynamicFilter(data));

    if (dynamicData.length > 0) {
        await Dynamic.insertMany(dynamicData);
        // console.log('Saved to Dynamic');
        updateLatestDynamic(messages);
    }
};

const dynamicFilter = (message) => {
    const dynamicTypes = [1, 2, 3, 4, 18];
    return dynamicTypes.includes(message.type);
};

module.exports = saveDynamic;
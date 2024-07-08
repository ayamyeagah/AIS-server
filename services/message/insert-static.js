const updateLatestStatic = require('./updateS-latest');
const Static = require('../../models/static.schema');

const saveStatic = async (messages) => {
    let staticData = messages.filter(data => staticFilter(data));

    if (staticData.length > 0) {
        await Static.insertMany(staticData);
        console.log('Saved to Static');
        updateLatestStatic(messages);
    }
}

const staticFilter = (message) => {
    const staticTypes = [5, 8, 24];
    return staticTypes.includes(message.type);
};

module.exports = saveStatic;
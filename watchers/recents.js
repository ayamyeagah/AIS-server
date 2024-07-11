const Recents = require('../models/recents.schema');

const changeStream = Recents.watch([], { fullDocument: 'updateLookup' });
changeStream.on('change', (change) => {
    if (change.operationType === 'update') {
        const docs = change.fullDocument;
        console.log(docs);
    } else if (change.operationType === 'insert') {
        const docs = change.fullDocument;
        console.log(docs);
    }
});
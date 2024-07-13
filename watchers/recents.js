const io = require('socket.io')();
const socketEvents = require('../config/constant');
const Recents = require('../models/recents.schema');

const watcher = async (io) => {
    const changeStream = Recents.watch([], { fullDocument: 'updateLookup' });
    changeStream.on('change', (event) => {
        const docs = event.fullDocument;
        if (event.operationType === 'insert') {
            io.emit(
                socketEvents.INSERT_RECENTS,
                docs
            );
            // console.log(docs);
        }
        if (event.operationType === 'update') {
            io.emit(
                socketEvents.UPDATE_RECENTS,
                docs
            );
            // console.log(docs);
        }
    });
}

module.exports = watcher;
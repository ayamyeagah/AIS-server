// /* for test only
// migrate to specific rules, very soon.
// */

// const consumeMsg = require('../services/consumer');
// const sentencesData = require('./raw');
// const conn = require('./db-conn');


// async function clean() {
//     try {
//         const db = conn();
//         if (!db) {
//             console.error('Database connection is not established.');
//             return;
//         }

//         const consume = await consumeMsg();

//         consume.on('data', (aisMsg) => {
//             // console.log('Received Decoded Data:', aisMsg);
//             // // Di sini Anda bisa mengakses semua properti dari msg_params
//             // console.log('MMSI:', aisMsg.mmsi);
//             // console.log('Type:', aisMsg.type);
//             // // dll

//             sentencesData(aisMsg);
//         });

//     } catch (error) {
//         console.error();
//     }
//     // const msg_from_queue = await consumeMsg();
// }

// clean().catch(console.error);

const consume = require('../services/consumer');
consume((message) => {
    console.log(message);
});
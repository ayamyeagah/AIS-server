const consumeMsg = require('../services/consumer');

async function clean() {
    // const msg_from_queue = await consumeMsg();
    const consume = await consumeMsg();

    consume.on('data', (aisMsg) => {
        console.log('Received Decoded Data:', aisMsg);
        // Di sini Anda bisa mengakses semua properti dari msg_params
        console.log('MMSI:', aisMsg.mmsi);
        console.log('Type:', aisMsg.type);
        // dll
    });
}

clean().catch(console.error);
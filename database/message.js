const Message = require('../models/message.schema');

const saveMsgs = async (messages) => {
    try {
        // Pastikan bahwa messages adalah array
        if (!Array.isArray(messages)) {
            messages = [messages];  // Jika bukan array, ubah menjadi array
        }

        // Memastikan semua pesan telah di-validasi sebelum disimpan
        const validatedMessages = messages.map(msg => {
            const newMessage = new Message(msg);
            return newMessage.validate(); // Validasi setiap pesan
        });

        // Menunggu validasi untuk semua pesan selesai
        await Promise.all(validatedMessages);

        // Simpan semua pesan ke MongoDB
        const results = await Message.insertMany(messages);
        console.log('Data AIS berhasil disimpan:', results);
    } catch (error) {
        console.error('Error saving AIS messages:', error.message);
    }
};

const aisMessageData = (messageParams) => {
    if (messageParams) {
        saveMsgs(messageParams);
    } else {
        console.log('Tidak ada pesan yang dibaca oleh konsumen');
    }
};

module.exports = aisMessageData;

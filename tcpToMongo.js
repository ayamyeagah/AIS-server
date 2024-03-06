const { MongoClient } = require('mongodb');

// URL koneksi ke database MongoDB
// const uri = 'mongodb://localhost:27017/';
const uri = 'mongodb+srv://ayamyeagah:Kubeb1012@cluster0.fmes5hv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Buat koneksi ke database
const client = new MongoClient(uri);

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Terhubung ke database MongoDB');
    } catch (err) {
        console.error('Kesalahan koneksi:', err);
    }
}

// Panggil fungsi untuk membuat koneksi
connectToDatabase();

// Socket untuk membaca data TCP
const net = require('net');
const PORT = 2567;

const clientSocket = new net.Socket();

clientSocket.connect(PORT, '103.167.35.10', () => {
    console.log('Terhubung ke server TCP');
});

clientSocket.on('data', async data => {
    // Data yang diterima dari koneksi TCP
    const receivedData = data.toString();
    console.log('Data diterima:', receivedData);

    // Simpan data ke database MongoDB
    const db = client.db('AIS'); // Gunakan database yang sudah Anda buat
    const collection = db.collection('rawdata');

    try {
        await collection.insertOne({ data: receivedData });
        console.log('Data berhasil disimpan ke MongoDB');
    } catch (err) {
        console.error('Kesalahan saat menyimpan data:', err);
    }
});

clientSocket.on('close', () => {
    console.log('Koneksi TCP ditutup');
});

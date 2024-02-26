const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://root:example@db:27017/',
            {useNewUrlParser: true,
            useUnifiedToplogy: true
        });
    console.log('MongoDB Connected');
    }
    catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;
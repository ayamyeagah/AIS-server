/* Main Application
*/
const dotenv = require('dotenv');
const path = require('path');
const config = require('./config/config');
const routes = require('./routes/latest-route');
const mongoose = require('mongoose');
const messages = require('./routes/message-route');
const cors = require('cors');
const express = require('express');

// env
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Connection
mongoose.connect(config.db.uri)
    .then(() => {
        console.log('CONNECTED TO MONGODB');
        app.listen(config.app.port, () => {
            console.log(`Server: http://localhost:${config.app.port}`);
        });
    })
    .catch((err) => {
        console.error('CONNECTION FAILED')
    })

// Routes
app.use('/api', routes);
messages().catch(console.error());

app.get('/', (req, res) => {
    res.send('Live monitoring prahu')
});

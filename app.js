/* Main Application
*/
const dotenv = require('dotenv');
const express = require('express');
const http = require('http');
const io = require('socket.io');
const path = require('path');
const config = require('./config/config');
const routes = require('./routes/latest-route');
const cors = require('cors');
const mongoose = require('mongoose');
const messages = require('./routes/message-route');
const watchers = require('./watchers/recents');

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

const app = express();

const server = http.createServer(app);
const ioServer = io(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Connection
mongoose.connect(config.db.uri)
    .then(() => {
        server.listen(config.app.port, async () => {
            await messages().catch(console.error());
            await watchers(ioServer);

            const GREEN_LINE = '\x1b[32m%s\x1b[0m';
            console.log('node version', process.version);
            console.log(GREEN_LINE, 'Server started');
            console.log(`Port: ${config.app.port}`);
            console.log(`Environment: ${app.get('env')}`);
        });
    })
    .catch((err) => {
        console.error('CONNECTION FAILED')
    })

app.use('/api', routes);

app.get('/', (req, res) => {
    res.send('AIS SERVER STARTED');
});

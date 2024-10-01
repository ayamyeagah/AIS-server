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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api', routes);

app.get('/', (req, res) => {
    res.send('AIS SERVER STARTED');
});

// 404 Handler
app.use(function (req, res, next) {
    const status = 404;
    const message = 'Resource not found';
    const errorResponse = {
        data: [],
        isError: true,
        errMsg: message,
    };
    res.status(status).send(errorResponse);
});

// 500 Handler
app.use((error, req, res, next) => {
    console.error(error);
    const status = 500;
    const message = process.env.NODE_ENV === 'development' ? error.message : 'API Server Error';
    const errorResponse = {
        data: [],
        isError: true,
        errMsg: message,
    };
    res.status(status).send(errorResponse);
});

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
        console.error('CONNECTION FAILED', err)
    })

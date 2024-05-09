/* main application
*/

const config = require('./config/config')
const routes = require('./routes/routes');
const { messages, static, dynamic } = require('./routes/message-route');
const bodyParser = require('body-parser');
const conn = require('./database/db-conn');
const express = require('express');
const app = express();

// app.use('/api', routes);

const port = config.app.port;

conn()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    });

messages().catch(console.error());
static().catch(console.error());
dynamic().catch(console.error());

app.get('/', (req, res) => {
    res.send('TESTTTTT')
});
// recent task
// post data to db after decoder using post method (do it in 'routes/routes.js')

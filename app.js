/* main application
*/

const config = require('./config/config')
const routes = require('./routes/latest-route');
const messages = require('./routes/message-route');
const bodyParser = require('body-parser');
const conn = require('./database/db-conn');
const cors = require('cors');
const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


const port = config.app.port;

conn()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    });

app.use('/api', routes);

messages().catch(console.error());

app.get('/', (req, res) => {
    res.send('Live monitoring prahu')
});
// recent task
// post data to db after decoder using post method (do it in 'routes/routes.js')

const config = require('./routes/config')
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

// app.use('/api', routes);

const port = config.app.port;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

app.get('/', (req, res) => {
   res.send('TESTTTTT')
});
// recent task
// post data to db after decoder using post method (do it in 'routes/routes.js')

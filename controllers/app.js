const config = require('../routes/config');
const routes = require('../routes/routes');
const express = require('express');
const app = express();

app.use('/api', routes);

const port = config.app.port;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
    
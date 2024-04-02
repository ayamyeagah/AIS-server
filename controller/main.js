const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('../routes/config');

// recent task
// post data to db after decoder using post method

// GET
app.get('/', (req, res)=> {
    res.send('hello world');
});

app.post('/', (req, res)=> {
    res.send('hello world');
})

app.listen(3000);
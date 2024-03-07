const express = require('express');
const connectDB = require('./db');
const Product = require('./product');

const app = express();
app.use(express.json());

connectDB();

app.get('/products', async(req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/products/:id', async(req, res) => {
    try {
        const product = await product.findById(req.params.id);
        if (!product) throw new Error('Product Not Found');
        res.json(product);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/products', async(req, res) => {
    try {
        const {nmea} = req.body;
        const product = new Product({nmea});
        await product .save();
        res.json({success: true});
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

app.put('/products/:id', async(req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!product) throw new Error('Product Not Found');
        res.json({success: true});
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

app.delete('/products/:id', async(req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) throw new Error('Product Not Found');
        res.json({success: true});
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

const port = 5001

app.listen(port, () => {
    console.log('SERVER STARTED');
})
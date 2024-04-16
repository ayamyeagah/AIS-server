const express = require('express');
const router = express.Router();

// GET
router.get('/vessels', (req, res) => {
    res.send("list of vessels");
});

// GET (ID)
router.get('/vessel/:id', (req, res) => {
    const vesselId = req.params.id;
    res.send(`Details of vessel ${vesselId}`);
});

// POST
router.post('/vessels', (req, res) => {
    res.send('Create a new vessel');
});

// UPDATE
router.put('/vessels/:id', (req, res) => {
    const vesselId = req.params.id;
    res.send(`Update vessel ${vesselId}`);
});

// DELETE
router.delete('vessels/:id', (req, res) => {
    const vesselId = req.params.id;
    res.send(`Delete vessel ${vesselId}`);
});

module.exports = router;
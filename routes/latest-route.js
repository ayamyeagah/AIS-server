const express = require('express');
const router = express.Router();
const getRecents = require('../controllers/recents-controller');
const getLocationByMMSI = require('../controllers/search-controller');
const { getVessels, getTotalVessels } = require('../controllers/vessel-controller');
const { getSurabaya, getSemarang, getBatam } = require('../controllers/station-controller');

router.get('/live', getRecents);
router.get('/location/:mmsi', getLocationByMMSI);
router.get('/vessels', getVessels);
router.get('/vessels/total', getTotalVessels);
router.get('/surabaya', getSurabaya);
router.get('/semarang', getSemarang);
router.get('/batam', getBatam);

module.exports = router;
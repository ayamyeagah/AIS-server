/* routes for latest data
*/

const getLatest = require('../controllers/latest-controller');
const express = require('express');
const router = express.Router();

router.get('/live', getLatest);

module.exports = router;
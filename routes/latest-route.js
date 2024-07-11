/* routes for latest data
*/

const getRecents = require('../controllers/recents-controller');
const express = require('express');
const router = express.Router();

router.get('/live', getRecents);

module.exports = router;
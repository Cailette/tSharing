var express = require('express');
var router = express.Router();

var startController = require('../controllers/startController');

router.get('/', startController.startGet);

router.post('/', startController.startPost);

module.exports = router;
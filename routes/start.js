var express = require('express');
var router = express.Router();

var startController = require('../controllers/start');

router.get('/', startController.get);

router.post('/', startController.post);

module.exports = router;
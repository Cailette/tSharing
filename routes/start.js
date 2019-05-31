var express = require('express');
var router = express.Router();

var startController = require('../controllers/router/start');

router.get('/', startController.get);


module.exports = router;
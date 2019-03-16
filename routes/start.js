var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('start');
});

router.post('/', function(req, res, next) {
    res.render('start');
});

module.exports = router;

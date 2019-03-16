var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('sharing');
});

router.post('/', function(req, res, next) {
    res.render('sharing');
});

module.exports = router;
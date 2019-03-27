var express = require('express');
var router = express.Router();

var sharingController = require('../controllers/sharingController');
var auth = require('../auth/auth');

router.get('/', auth.authenticationMiddleware, sharingController.sharingGet);

router.get('/yourTasks', auth.authenticationMiddleware, sharingController.yourTasks);

router.get('/logout', sharingController.logout);

module.exports = router;
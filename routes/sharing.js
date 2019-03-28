var express = require('express');
var router = express.Router();

var sharingController = require('../controllers/sharing');
var auth = require('../auth/auth');

router.get('/', auth.authenticationMiddleware, sharingController.get);

router.get('/yourTasks', auth.authenticationMiddleware, sharingController.yourTasks);

router.get('/logout', sharingController.logout);

module.exports = router;
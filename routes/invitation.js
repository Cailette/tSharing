var express = require('express');
var router = express.Router();

var invitationController = require('../controllers/router/invitation');

router.get('/', invitationController.get);

router.post('/', invitationController.post);

module.exports = router;
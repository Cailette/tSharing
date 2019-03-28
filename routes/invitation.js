var express = require('express');
var router = express.Router();

var invitationController = require('../controllers/invitation');

router.get('/', invitationController.get);

router.post('/', invitationController.post);

module.exports = router;
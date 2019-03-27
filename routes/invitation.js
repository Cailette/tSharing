var express = require('express');
var router = express.Router();

var invitationController = require('../controllers/invitationController');

router.get('/', invitationController.invitationGet);

router.post('/', invitationController.invitationPost);

module.exports = router;
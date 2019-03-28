var express = require('express');
var router = express.Router();
var joinController = require('../controllers/join');
var validateFormInput = require('../controllers/validateFormInput');

router.get('/', joinController.get);

router.post('/', validateFormInput.validateJoinForm, joinController.post);

module.exports = router;
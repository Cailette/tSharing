var express = require('express');
var router = express.Router();
var createController = require('../controllers/router/create');
var validateFormInput = require('../controllers/validateFormInput');

router.get('/', createController.get);

router.post('/', validateFormInput.validateCreateForm, createController.post);

module.exports = router;
var express = require('express');
var router = express.Router();
var createController = require('../controllers/createController');
var validate = require('../controllers/userValidate');

router.get('/', createController.createGet);

router.post('/', validate.validateCreate, createController.validatePost, createController.createPost);

module.exports = router;
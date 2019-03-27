var express = require('express');
var router = express.Router();
var createController = require('../controllers/createController');

router.get('/', createController.createGet);

router.post('/', createController.validatePost, createController.createPost);

module.exports = router;
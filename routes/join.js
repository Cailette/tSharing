var express = require('express');
var router = express.Router();

var joinController = require('../controllers/joinController');
var validate = require('../controllers/userValidate');

router.get('/', joinController.joinGet);

router.post('/', validate.validateJoin, joinController.validatePost, joinController.joinPost);

module.exports = router;
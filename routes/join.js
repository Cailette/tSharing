var express = require('express');
var router = express.Router();

var joinController = require('../controllers/joinController');

router.get('/', joinController.joinGet);

router.post('/', joinController.validatePost, joinController.joinPost);

module.exports = router;
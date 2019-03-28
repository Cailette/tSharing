var express = require('express');
var router = express.Router();

var loginController = require('../controllers/login');
var auth = require('../auth/auth');

router.get('/', auth.isNotAuthenticated, loginController.get); 

router.post('/', auth.isNotAuthenticated, loginController.post);

module.exports = router;
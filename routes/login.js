var express = require('express');
var router = express.Router();

var loginController = require('../controllers/loginController');
var auth = require('../auth/auth');

router.get('/', auth.isNotAuthenticated, loginController.loginGet); 

router.post('/', auth.isNotAuthenticated, loginController.loginPost);

module.exports = router;
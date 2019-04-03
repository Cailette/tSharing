var express = require('express');
var router = express.Router();

var sharingController = require('../controllers/sharing');
var accountController = require('../controllers/account');
var validateFormInput = require('../controllers/validateFormInput');
var auth = require('../auth/auth');

router.get('/', auth.authenticationMiddleware, sharingController.get);

router.get('/yourTasks', auth.authenticationMiddleware, sharingController.yourTasks);

router.get('/account', auth.authenticationMiddleware, accountController.get);

router.get('/editaccount', auth.authenticationMiddleware, accountController.getEdit);

router.post('/posteditaccount', validateFormInput.validateEditForm, accountController.postEdit);

router.get('/deleteaccount', auth.authenticationMiddleware, accountController.delete);

router.get('/logout', sharingController.logout);

module.exports = router;
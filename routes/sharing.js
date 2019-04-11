var express = require('express');
var router = express.Router();

var sharingController = require('../controllers/router/sharing');
var accountController = require('../controllers/router/account');
var allTaskController = require('../controllers/router/allTask');
var validateFormInput = require('../controllers/validateFormInput');
var auth = require('../auth/auth');

router.get('/', auth.authenticationMiddleware, sharingController.get);

router.get('/allTasks', auth.authenticationMiddleware, allTaskController.get);

router.get('/start', auth.authenticationMiddleware, sharingController.start);

router.get('/account', auth.authenticationMiddleware, accountController.get);

router.get('/editaccount', auth.authenticationMiddleware, accountController.getEdit);

router.post('/posteditaccount', auth.authenticationMiddleware, validateFormInput.validateEditForm, accountController.postEdit);

router.get('/deleteaccount', auth.authenticationMiddleware, accountController.delete);

router.get('/logout', sharingController.logout);

router.post('/addTask', auth.authenticationMiddleware, validateFormInput.validateTaskForm, allTaskController.post);

router.get('/deleteTask', auth.authenticationMiddleware, allTaskController.deleteTask);

router.get('/assignTask', auth.authenticationMiddleware, allTaskController.assignTask);

module.exports = router;
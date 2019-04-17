var express = require('express');
var router = express.Router();

var sharingController = require('../controllers/router/sharing');
var accountController = require('../controllers/router/account');
var allTaskController = require('../controllers/router/allTask');
var yourTaskController = require('../controllers/router/yourTask');
var validateFormInput = require('../controllers/validateFormInput');
var auth = require('../auth/auth');

router.get('/', auth.authenticationMiddleware, sharingController.get);

router.get('/start', auth.authenticationMiddleware, sharingController.start);

router.get('/account', auth.authenticationMiddleware, accountController.get);

router.get('/editaccount', auth.authenticationMiddleware, accountController.getEdit);

router.post('/posteditaccount', auth.authenticationMiddleware, validateFormInput.validateEditForm, accountController.postEdit);

router.get('/deleteaccount', auth.authenticationMiddleware, accountController.delete);

router.get('/logout', sharingController.logout);

router.get('/allTasks', auth.authenticationMiddleware, allTaskController.get);

router.post('/addTask', auth.authenticationMiddleware, validateFormInput.validateTaskForm, allTaskController.post);

router.put('/deleteTask', auth.authenticationMiddleware, allTaskController.deleteTask);

router.put('/assignTask', auth.authenticationMiddleware, allTaskController.assignTask);

router.get('/yourTasks', auth.authenticationMiddleware, yourTaskController.get);

router.put('/completeTask', auth.authenticationMiddleware, yourTaskController.completeTask);

router.put('/removeTask', auth.authenticationMiddleware, yourTaskController.removeTask);

module.exports = router;
var express = require('express');
var router = express.Router();
var expressValidator = require('express-validator');
var passport = require('passport');
var bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/', authenticationMiddleware(), function(req, res, next)
{
	res.redirect('/sharing/yourTasks') 
});

router.get('/yourTasks', authenticationMiddleware(), function(req, res, next)
{
	res.render('sharing');   
});

router.get('/logout', function(req, res, next)
{
	req.logout();
	req.session.destroy();
    res.redirect('/'); 
});

function authenticationMiddleware()
{  
	return (req, res, next) => {
		console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
	    if (req.isAuthenticated()) return next();
	    res.redirect('/login')
	}
}

module.exports = router;
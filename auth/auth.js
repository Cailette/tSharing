var passport = require('passport');

exports.isNotAuthenticated = function(req, res, next)
{  
	if (!req.isAuthenticated()) return next();
	res.redirect('/sharing/yourTasks')
}

exports.authenticationMiddleware = function(req, res, next)
{  
	if (req.isAuthenticated()) return next();
	res.redirect('/login')
}


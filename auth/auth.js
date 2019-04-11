var passport = require('passport');

exports.isNotAuthenticated = function(req, res, next)
{  
	if (!req.isAuthenticated()) return next();
	res.redirect('/sharing/allTasks')
}

exports.authenticationMiddleware = function(req, res, next)
{  
	if (req.isAuthenticated()) return next();
	res.redirect('/login')
}


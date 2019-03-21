var express = require('express');
var router = express.Router();
var passport = require('passport');
var bcrypt = require('bcrypt');

const User = require('../models/user');

router.get('/', isNotAuthenticated(), function(req, res, next)
{
    res.render('login', { msg: "" });
}); 

router.post('/', isNotAuthenticated(), function(req, res, next)
{
    User.findOne({
        where: {
            email: req.body.uEmail
        }
    }).then(user => {
        if(bcrypt.compareSync(req.body.uPassword, user.password)) {
            const USER_ID = user.idUser;
            req.session.USER_ID = USER_ID;
            req.login(USER_ID, function(err) {
                res.redirect('/sharing') 
            })
        } else {
            res.render('login', { msg: 'User does not exist.'} );
        }
    })
});

passport.serializeUser(function(USER_ID, done)
{
    done(null, USER_ID);
});

passport.deserializeUser(function(USER_ID, done)
{
    done(null, USER_ID);
});

function isNotAuthenticated()
{  
	return (req, res, next) => {
		console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
	    if (!req.isAuthenticated()) return next();
	    res.redirect('/sharing/yourTasks')
	}
}

module.exports = router;
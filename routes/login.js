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


    // db = require('../db.js');
    // const uMail = req.body.uMail;
    // const uPassword = req.body.uPassword;

    // var selectMate = "SELECT idMate, mPassword FROM `mates` WHERE `mMail`='" + uMail + "'";                           
    // db.query(selectMate, function(err, user)
    // {
    //     if (err) throw err;
    //     if(user.length != 0)
    //     {
    //         const USER_PASSWORD = user[0].mPassword;
    //         console.log("USER_PASSWORD: " + user[0].mPassword.toString());
    //         bcrypt.compare(uPassword, USER_PASSWORD, function(err, result) {
    //             console.log("result: " + result.toString());
    //             if(result == true)
    //             {
    //                 const USER_ID = user[0].idMate;
    //                 console.log("USER_ID: " + USER_ID);
    //                 req.session.USER_ID = USER_ID;
    //                 req.login(USER_ID, function(err) {
    //                     res.redirect('/sharing/yourTasks') 
    //                 })
    //             }else{
    //                 res.render('login', { msg: "Incorrect password. Please try again." });
    //             }
    //         });
    //     }
    //     else{
    //         res.render('login', { msg: "Incorrect e-mail. Please try again." });
    //     }
    // });
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
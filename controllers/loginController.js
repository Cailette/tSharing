var bcrypt = require('bcrypt');

const User = require('../models/user');

exports.loginGet = function(req, res, next) {
    res.render('login', { msg: "" });
};

exports.loginPost = function(req, res, next) {
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
};
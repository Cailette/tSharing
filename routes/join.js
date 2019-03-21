var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

const User = require('../models/user');
const Board = require('../models/board');

router.get('/', function(req, res, next) {
    res.render('join', { msg: "" });
});

router.post('/', function(req, res, next) {
    req.checkBody('uName', 'Username must be between 2-15 characters long.').len(2, 15);
    req.checkBody('uName', 'Username can only contain letters, numbers, or underscores.').matches(/^[A-Za-z0-9_-]+$/, 'i');
    req.checkBody('uPassword', 'User passwords must be between 6-20 characters long.').len(6, 20);
    req.checkBody('uPassword', 'User passwords can only contain letters, numbers, or underscores.').matches(/^[A-Za-z0-9_-]+$/, 'i');
    req.checkBody('uPasswordMatch', 'User passwords do not match, please try again.').equals(req.body.uPassword);

    const errors = req.validationErrors();
    if(errors)
    {
        console.log(`errors: ${JSON.stringify(errors)}`);
        res.render('join', { msg: errors });
    }else{
        const userData = {
            email: req.body.uEmail,
            name: req.body.uName,
            password: req.body.uPassword,
            idBoard: null
        }

        Board.findOne({
            where: {
                name: req.body.bName
            }
        }).then(board => {
                if(bcrypt.compareSync(req.body.bPassword, board.password)) {
                    User.findOne({
                        where: {
                            email: req.body.uEmail
                        }
                    }).then(userEmail => {
                        if(!userEmail) {
                            User.findOne({
                                where: {
                                    name: req.body.uName,
                                    idBoard: board.idBoard
                                }
                            }).then(user => {
                                if(!user) {
                                    const uhash = bcrypt.hashSync(userData.password, 10);
                                    userData.password = uhash;
                                    userData.idBoard = board.idBoard;
                                    User.create(userData)
                                        .then(user => {
                                            res.redirect('/');
                                        })
                                        .catch(err => {
                                            console.log('error: ' + err);
                                        })
                                } else {
                                    res.render('join', { msg: "The username you have entered is already taken in this sharing board." });
                                }
                            })
                        } else {
                            res.render('join', { msg: "The mail you have entered is already used." });
                        }
                    })
                }else {
                    res.render('join', { msg: "Board does not exist." });
                }
        }) 
        .catch(err => {
            console.log('error: ' + err);
        })
    }
});

module.exports = router;
var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

const User = require('../models/user');
const Board = require('../models/board');
 
router.get('/', function(req, res, next) {
    res.render('create', {msg: ""});
});

router.post('/', function(req, res, next) 
{
    req.checkBody('bName', 'Board name must be between 2-15 characters long.').len(2, 15);
    req.checkBody('bName', 'Board name can only contain letters, numbers, or underscores.').matches(/^[A-Za-z0-9_-]+$/, 'i');
    req.checkBody('bPassword', 'Board password can only contain letters, numbers, or underscores.').matches(/^[A-Za-z0-9_-]+$/, 'i');
    req.checkBody('bPassword', 'Board password must be between 6-20 characters long.').len(6, 20);
    req.checkBody('bPasswordMatch', 'Board passwords do not match, please try again.').equals(req.body.bPassword);

    req.checkBody('uName', 'Username must be between 2-15 characters long.').len(2, 15);
    req.checkBody('uName', 'Username can only contain letters, numbers, or underscores.').matches(/^[A-Za-z0-9_-]+$/, 'i');
    req.checkBody('uPassword', 'User passwords must be between 6-20 characters long.').len(6, 20);
    req.checkBody('uPassword', 'User passwords can only contain letters, numbers, or underscores.').matches(/^[A-Za-z0-9_-]+$/, 'i');
    req.checkBody('uPasswordMatch', 'User passwords do not match, please try again.').equals(req.body.uPassword);

    const errors = req.validationErrors();
    if(errors) 
    {
        console.log(`errors: ${JSON.stringify(errors)}`);
        res.render('create', { msg: errors });
    }else{
        const boardData = {
            name: req.body.bName,
            password: req.body.bPassword,
        }
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
                if(!board) {
                    User.findOne({
                        where: {
                            email: req.body.uEmail
                        }
                    }).then(user => {
                        if(!user) {
                            const bhash = bcrypt.hashSync(boardData.password, 10);
                            boardData.password = bhash;
                            const uhash = bcrypt.hashSync(userData.password, 10);
                            userData.password = uhash;

                            Board.create(boardData)
                                .then(board => {
                                    userData.idBoard = board.idBoard;
                                    User.create(userData)
                                    .then(user => {
                                        res.redirect('/');
                                    })
                                    .catch(err => {
                                        console.log('error: ' + err);
                                    })
                                })
                                .catch(err => {
                                    console.log('error: ' + err);
                                })
                        } else {
                            res.render('create', { msg: "The mail you have entered is already used." });
                        }
                    })
                } else {
                    res.render('create', { msg: "The board name you have entered is already taken." });
            }
        }) 
        .catch(err => {
            console.log('error: ' + err);
        })
    }
});

module.exports = router;
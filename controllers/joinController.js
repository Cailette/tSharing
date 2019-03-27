var bcrypt = require('bcrypt');

const User = require('../models/user');
const Board = require('../models/board');
var validate = require('./validateFormInput');

exports.joinGet = function(req, res) {
    res.render('join', { msg: "" });
};

exports.validatePost = function(req, res, next) {
    const errors = validate.validateJoin(req);
    if(errors)
    {
        console.log(`errors: ${JSON.stringify(errors)}`);
        res.render('join', { msg: errors });
    }else{
        Board.findOne({
            where: {
                name: req.body.bName
            }
        }).then(board => {
            if(board) {
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
                                    next();
                                } else {
                                    res.render('join', { msg: "The username you have entered is already taken in this sharing board." });
                                }
                            })
                        } else {
                            res.render('join', { msg: "The mail you have entered is already used." });
                        }
                    })
                }else {
                    res.render('join', { msg: "Incorrect board password." });
                }
            }else {
                res.render('join', { msg: "Board does not exist." });
            }
        }) 
        .catch(err => {
            console.log('error: ' + err);
        })
    }
};

exports.joinPost = function(req, res) {    
    Board.findOne({
        where: {
            name: req.body.bName
        }
    }).then(board => {
        const uhash = bcrypt.hashSync(req.body.uPassword, 10);        
        const userData = {
            email: req.body.uEmail,
            name: req.body.uName,
            password: uhash,
            idBoard: board.idBoard
        } 
        User.create(userData)
            .then(user => {
                res.redirect('/');
            })
            .catch(err => {
                console.log('error: ' + err);
            })
        })
};
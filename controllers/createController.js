var bcrypt = require('bcrypt');

const User = require('../models/user');
const Board = require('../models/board');
var validate = require('./validateFormInput');


exports.createGet = function(req, res) {
    res.render('create', {msg: ""});
};

exports.validatePost = function(req, res, next) {
    var errors = validate.validateCreate(req);
    if(errors) 
    {
        console.log(`errors: ${JSON.stringify(errors)}`);
        res.render('create', { msg: errors });
    }else{
        errors = [];
        Board.findOne({
            where: {
                name: req.body.bName
            }
        }).then(board => {
                if(board) {
                    errors.push({ msg: "The board name you have entered is already taken." })
                }
                User.findOne({
                    where: {
                        email: req.body.uEmail
                    }
                }).then(user => {
                    if(user) {
                        errors.push({ msg: "The mail you have entered is already used." })
                    } 
                    if(!errors.length) {
                        next();
                    } else {
                        res.render('create', { msg: errors });
                    }
                })
        }) 
        .catch(err => {
            console.log('error: ' + err);
        })
    }
};

exports.createPost = function(req, res, next) {  
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
    
    const bhash = bcrypt.hashSync(boardData.password, 10);
    boardData.password = bhash;
    const uhash = bcrypt.hashSync(userData.password, 10);
    userData.password = uhash;

    Board.create(boardData)
        .then(board => {
            userData.idBoard = board.idBoard;
            User.create(userData)
            .then(user => {
                res.redirect('/invitation');
            })
            .catch(err => {
                console.log('error: ' + err);
            })
        })
        .catch(err => {
            console.log('error: ' + err);
        })
};
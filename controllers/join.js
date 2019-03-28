var bcrypt = require('bcrypt');

const User = require('../models/user');
const Board = require('../models/board');
const userContoroller = require('./user');
const boardContoroller = require('./board');
const { hashPassword } = require('./create');

var join = module.exports = {

    get: function(req, res) {
        res.render('join', { msg: "" });
    },

    post: async function(req, res, next) {  
        const existB = await boardContoroller.getByName(req.body.bName);
        const existU = await userContoroller.getByEmail(req.body.uEmail);

        if (!existB) {
            res.render('join', { msg: "The board does not exist." });
        } else {
            if(!bcrypt.compareSync(req.body.bPassword, existB.password)) {
                res.render('join', { msg: "Incorrect board password." });
            } else {
                if (existU) {
                    res.render('join', { msg: "The mail you have entered is already used." });
                } else {
                    const uhash = hashPassword(req.body.uPassword);
                    const userData = {
                        email: req.body.uEmail,
                        name: req.body.uName,
                        password: uhash,
                        idBoard: existB.idBoard
                    }  
                    const createdUser = await userContoroller.create(userData);

                    console.log('createdUser: ' + createdUser);
                    if (createdUser) {
                        res.redirect('/');
                    } else {
                        res.render('create', { msg: "Something went wrong, try again." });
                    }
                }
            }
        }
    },
}
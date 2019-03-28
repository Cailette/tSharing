var bcrypt = require('bcrypt');

const userContoroller = require('./user');
const boardContoroller = require('./board');


var create = module.exports = {

    get: function(req, res) {
        res.render('create', {msg: ""});
    },

    post: async function(req, res, next) {  
        const existB = await boardContoroller.getByName(req.body.bName);
        const existU = await userContoroller.getByEmail(req.body.uEmail);

        if (existB) {
            res.render('create', { msg: "The board name you have entered is already taken." });
        } else {
            if (existU) {
                res.render('create', { msg: "The mail you have entered is already used." });
            } else {
                const bhash = create.hashPassword(req.body.bPassword);
                const uhash = create.hashPassword(req.body.uPassword);

                const boardData = {
                    name: req.body.bName,
                    password: bhash,
                }
                const createdBoard = await boardContoroller.create(boardData);
                
                const userData = {
                    email: req.body.uEmail,
                    name: req.body.uName,
                    password: uhash,
                    idBoard: createdBoard.idBoard
                }  
                const createdUser = await userContoroller.create(userData);

                console.log('createdUser: ' + createdUser);
                if (createdUser) {
                    res.redirect('/invitation');
                } else {
                    res.render('create', { msg: "Something went wrong, try again." });
                }

            }
        }
    },

    hashPassword: function(password) {
        return bcrypt.hashSync(password, 10);
    }   

}
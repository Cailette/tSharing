const userContoroller = require('../model/user');
const boardContoroller = require('../model/board');
var bcrypt = require('bcrypt');
const { hashPassword } = require('./create');

var account = module.exports = {

    get: async function(req, res, next) {
        const user = await userContoroller.getById(req.session.USER_ID);
        const board = await boardContoroller.getById(req.session.BOARD_ID);
        const teammates = await userContoroller.getTeammates(req.session.BOARD_ID, req.session.USER_ID);
		res.render('sharing', { page: 'account', user: user, board: board, teammates: teammates });   
    },
    
	getEdit: async function(req, res, next) {
        const user = await userContoroller.getById(req.session.USER_ID);
        res.render('sharing', { page: 'editAccount', user: user, msg: "" }); 
    },
    
	postEdit: async function(req, res, next) {
        if(req.body.uPassword) {
            account.updatePassword(req, res);
        }else {
            account.updateName(req, res);
        }
	},

	delete: async function(req, res, next) {
        const user = await userContoroller.getById(req.session.USER_ID);
		req.logout();
        req.session.destroy();

        const deleteUser = await userContoroller.delete(user.idUser);
        if (deleteUser) {

            const teammates = await userContoroller.getTeammates(user.idBoard, user.idUser);
            if (!(teammates.length > 0)) {

                const deleteBoard = await boardContoroller.delete(user.idBoard);
                if (deleteBoard) {
                    res.redirect('/'); 
                } else {
                    res.render('login', { msg: "Something went wrong." });
                }
            } else {
                res.redirect('/'); 
            }
        } else {
            res.render('login', { msg: "Something went wrong." });
        }
    },

    updatePassword: async function(req, res) {
        const user = await userContoroller.getById(req.session.USER_ID);
        if(!bcrypt.compareSync(req.body.oldPassword, user.password)) {
            res.render('sharing', { page: 'editAccount', user: user, msg: "Incorrect password." }); 
        } else {
            const uhash = hashPassword(req.body.uPassword);
            const userData = {
                name: req.body.uName,
                password: uhash
            }

            const updatedUser = await userContoroller.update(userData, req.session.USER_ID);
            if (updatedUser) {
                res.redirect('/sharing/account');
            } else {
                res.render('sharing', { page: 'editAccount', user: user, msg: "Something went wrong, try again." }); 
            }
        }
    },

    updateName: async function(req, res) {
        const userData = {
            name: req.body.uName
        }
        
        const updatedUser = await userContoroller.update(userData, req.session.USER_ID);
        if (updatedUser) {
            res.redirect('/sharing/account');
        } else {
            res.render('sharing', { page: 'editAccount', user: user, msg: "Something went wrong, try again." }); 
        }
    }
    
}
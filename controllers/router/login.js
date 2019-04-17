var bcrypt = require('bcrypt');
const userContoroller = require('../model/user');

var login = module.exports = {

    get: function(req, res) {
        res.render('login', { msg: "" });
    },

    post: async function(req, res, next) {
        const existU = await userContoroller.getByEmail(req.body.uEmail);

        if (!existU || !bcrypt.compareSync(req.body.uPassword, existU.password)) {
            res.render('login', { msg: "User does not exist." });
        } else {
            const USER_ID = existU.UserId;
            const BOARD_ID = existU.BoardId;
            req.session.USER_ID = USER_ID;
            req.session.BOARD_ID = BOARD_ID;
            req.login(USER_ID, function(err) {
                res.redirect('/sharing') 
            })
        }
    },
    
}
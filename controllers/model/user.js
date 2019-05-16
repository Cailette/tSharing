const User = require( '../../models/index.js').User;

var Sequelize = require("sequelize");
const Op = Sequelize.Op;

var user = module.exports = {
    
    create: async function(userData) {
        return await User.create(userData)
            .then(user => {
                if(user) return user;
                return false;
            })
            .catch(err => {
                console.log('error: ' + err);
                return false;
            })
    },

    delete: async function(idUser) {
		return await User.destroy({
            where: {
                id: idUser
            }
        }).then(() => {
            return true;
        })
        .catch(err => {
            console.log('error: ' + err);
            return false;
        })
    },    

    update: async function(userData, idUser) {
		return await User.update(
            userData, 
            { where: {id: idUser} 
        }).then(() => {
            return true;
        })
        .catch(err => {
            console.log('error: ' + err);
            return false;
        })
    },

    getById: async function(idUser) {
		return await User.findOne({
            where: {
                id: idUser
            }
        }).then(user => {
            if(user) return user;
            return false;
        })
        .catch(err => {
            console.log('error: ' + err);
        })
    },

    getByEmail: async function(userEmail) {
		return await User.findOne({
            where: {
                email: userEmail
            }
        }).then(user => {
            if(user) return user;
            return false;
        })
        .catch(err => {
            console.log('error: ' + err);
        })
    },
    
    getTeammates: async function(idBoard) {
		return await User.findAll({
            where: {
                BoardId: idBoard
            }
        }).then(users => {
            if(users) return users;
            return false;
        })
        .catch(err => {
            console.log('error: ' + err);
            return false;
        })
    },

    countUsers: async function(idBoard) {
		return await User.findOne({
            attributes: [
                [Sequelize.fn('COUNT', Sequelize.col('id')),'qty']
            ],
            where: {
                BoardId: idBoard
            }
        }).then(user => {
            if(user) return user.get('qty');
            return false;
        })
        .catch(err => {
            console.log('error: ' + err);
        })
    },

    getUserNames: async function(idBoard) {
		return await User.findAll({
            attributes: [
                "name"
            ],
            where: {
                BoardId: idBoard
            }
        }).then(user => {
            if(user) return user;
            return false;
        })
        .catch(err => {
            console.log('error: ' + err);
        })
    },
}
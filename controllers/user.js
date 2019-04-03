const User = require('../models/user');

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
                idUser: idUser
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
            { where: {idUser: idUser} 
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
                idUser: idUser
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
    
    getTeammates: async function(idBoard, idUser) {
		return await User.findAll({
            where: {
                idBoard: idBoard
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

}
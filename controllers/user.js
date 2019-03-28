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

}
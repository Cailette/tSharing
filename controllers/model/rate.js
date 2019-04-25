const Task = require( '../../models/index.js').Task;
const User = require( '../../models/index.js').User;
const Rate = require( '../../models/index.js').Rate;

var Sequelize = require("sequelize");
const Op = Sequelize.Op;

var rate = module.exports = {
    
    create: async function(rateData) {
        return await Rate.create(rateData)
            .then(rate => {
                if(rate) return rate;
                return false;
            })
            .catch(err => {
                console.log('error: ' + err);
                return false;
            })
    },

    delete: async function(idRate) {
		return await Rate.destroy({
            where: {
                id: idRate
            }
        }).then(() => {
            return true;
        })
        .catch(err => {
            console.log('error: ' + err);
            return false;
        })
    },    

    update: async function(rateData, idRate) {
		return await Rate.update(
            rateData, 
            { where: {id: idRate} 
        }).then(() => {
            return true;
        })
        .catch(err => {
            console.log('error: ' + err);
            return false;
        })
    },

    getById: async function(idRate) {
		return await Rate.findOne({
            where: {
                id: idRate
            },
            include: [{
                model: User,
                as: 'User'
            }]
        }).then(rate => {
            if(rate) return rate;
            return false;
        })
        .catch(err => {
            console.log('error: ' + err);
        })
    },

    getRatingAvg: async function(idBoard) {
		return await Rate.findAll({
            attributes: [
                'id', 
                [Sequelize.fn('AVG', Sequelize.col('value')), 
                'ratingAvg']
            ],
            group: ['TaskId'],
            include: [{
                model: Task,
                as: 'Task',
                where: {
                    BoardId: idBoard
                }
            }]
        }).then(rate => {
            console.log('rate: ' + JSON.stringify(rate));
            if(rate) return rate;
            return false;
        })
        .catch(err => {
            console.log('error: ' + err);
        })
    },

    getUserRates: async function(idUser) {
		return await Rate.findAll({
            where: {
                UserId: idUser
            }
        }).then(rate => {
            console.log('rate: ' + JSON.stringify(rate));
            if(rate) return rate;
            return false;
        })
        .catch(err => {
            console.log('error: ' + err);
        })
    },

    getUserRate: async function(idUser, idTask) {
		return await Rate.findOne({
            where: {
                UserId: idUser,
                TaskId: idTask
            }
        }).then(rate => {
            console.log('rate: ' + JSON.stringify(rate));
            if(rate) return rate;
            return false;
        })
        .catch(err => {
            console.log('error: ' + err);
        })
    },
}
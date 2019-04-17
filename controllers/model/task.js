const Task = require( '../../models/index.js').Task;
const User = require( '../../models/index.js').User;

var Sequelize = require("sequelize");
const Op = Sequelize.Op;

var task = module.exports = {
    
    create: async function(taskData) {
        return await Task.create(taskData)
            .then(task => {
                if(task) return task;
                return false;
            })
            .catch(err => {
                console.log('error: ' + err);
                return false;
            })
    },

    delete: async function(idTask) {
		return await Task.destroy({
            where: {
                id: idTask
            }
        }).then(() => {
            return true;
        })
        .catch(err => {
            console.log('error: ' + err);
            return false;
        })
    },    

    update: async function(taskData, idTask) {
		return await Task.update(
            taskData, 
            { where: {id: idTask} 
        }).then(() => {
            return true;
        })
        .catch(err => {
            console.log('error: ' + err);
            return false;
        })
    },

    getById: async function(idTask) {
		return await Task.findOne({
            where: {
                id: idTask
            },
            include: [{
                model: User,
                as: 'User'
            }]
        }).then(task => {
            if(task) return task;
            return false;
        })
        .catch(err => {
            console.log('error: ' + err);
        })
    },

    getAllTasks: async function(idBoard) {
		return await Task.findAll({
            where: {
                BoardId: idBoard,
                [Op.or]: [{status: 'assigned'}, {status: 'free'}]
            },
            include: [{
                model: User,
                as: 'User'
            }]
        }).then(task => {
            console.log(JSON.stringify(task));
            if(task) return task;
            return false;
        })
        .catch(err => {
            console.log('error: ' + err);
        })
    },
}
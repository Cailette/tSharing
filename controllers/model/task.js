const Task = require('../../models/task');
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
                idTask: idTask
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
            { where: {idTask: idTask} 
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
                idTask: idTask
            }
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
                idBoard: idBoard,
                [Op.or]: [{status: 'assigned'}, {status: 'free'}]
            }
        }).then(task => {
            if(task) return task;
            return false;
        })
        .catch(err => {
            console.log('error: ' + err);
        })
    },
}
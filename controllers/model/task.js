const Task = require( '../../models/index.js').Task;
const User = require( '../../models/index.js').User;
const Rate = require( '../../models/index.js').Rate;

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

    getTasksWithOptions: async function(idBoard, order, options) {
		return await Task.findAll({
            where: {
                BoardId: idBoard,
                [Op.or]: options
            },
            include: [{
                model: User,
                as: 'User'
            }], 
            order: order,
        }).then(task => {
            if(task) return task;
            return false;
        })
        .catch(err => {
            console.log('error: ' + err);
        })
    },

    getUserTasksWithOptions: async function(idBoard, idUser, order, options) {
		return await Task.findAll({
            where: {
                BoardId: idBoard,
                UserId: idUser,
                [Op.or]: options
            },
            include: [{
                model: User,
                as: 'User'
            }], 
            order: order,
        }).then(task => {
            if(task) return task;
            return false;
        })
        .catch(err => {
            console.log('error: ' + err);
        })
    },

    getYourTasks: async function(idBoard, idUser) {
		return await Task.findAll({
            where: {
                BoardId: idBoard,
                UserId: idUser,
                status: 'assigned'
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
var Sequelize = require("sequelize");
const userContoroller = require('../model/user');
const boardContoroller = require('../model/board');
const taskContoroller = require('../model/task');

var allTask = module.exports = {

	get: async function(req, res) {
        const tasks = await taskContoroller.getAllTasks(req.session.BOARD_ID);
		res.render('sharing', { page: 'allTasks', tasks: tasks }); 
	},

	post: async function(req, res) {
        var timeNow = new Date().timeNow();
        var dataNow = new Date().dataNow();
        var time = dataNow.toString() + " " + timeNow.toString();

        const taskData = {
            title: req.body.tTitle,
            comment: req.body.tComment,
            date: time, 
            UserId: req.session.USER_ID,  
            BoardId: req.session.BOARD_ID,
            status: 'free'
        }  
        const createdTask = await taskContoroller.create(taskData);
        const newTask = await taskContoroller.getById(createdTask.id);

        console.log('createdTask: ' + JSON.stringify(createdTask));
        console.log('newTask: ' + JSON.stringify(newTask));
        if (newTask) {
            res.send({ task: newTask });
        } else {
            res.redirect('/');
        } 
	},

	deleteTask: async function(req, res) {
        allTask.updateStatus('deleted', req, res);
	},

	assignTask: async function(req, res) {
        allTask.updateStatus('assigned', req, res);
	},

	updateStatus: async function(status, req, res) {
        var timeNow = new Date().timeNow();
        var dataNow = new Date().dataNow();
        var time = dataNow.toString() + " " + timeNow.toString();

        const TASK_ID = req.query.idTask;
        const taskData = {
            date: time, 
            UserId: req.session.USER_ID,
            status: status
        }  
        
        const updatedTask = await taskContoroller.update(taskData, TASK_ID);
        const newTask = await taskContoroller.getById(TASK_ID);
        if (updatedTask) {
            console.log('newTask: ' + JSON.stringify(newTask));
            res.send({ task: newTask });
        } else {
            res.redirect('/');
        }
	},
}

Date.prototype.dataNow = function () 
{ 
    return this.getFullYear() + "-" +(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) + "-" + ((this.getDate() < 10)?"0":"") + this.getDate();
}

Date.prototype.timeNow = function () 
{
    return ((this.getHours() < 10)?"0":"") + this.getHours() + ":" + ((this.getMinutes() < 10)?"0":"") + this.getMinutes() + ":" + ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}
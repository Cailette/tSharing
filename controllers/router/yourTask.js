const taskContoroller = require('../model/task');

var allTask = module.exports = {

	get: async function(req, res) {
        const tasks = await taskContoroller.getYourTasks(req.session.BOARD_ID, req.session.USER_ID);
		res.render('sharing', { page: 'yourTasks', tasks: tasks }); 
	},

	removeTask: async function(req, res) {
        allTask.updateStatus('free', req, res);
	},

	completeTask: async function(req, res) {
        allTask.updateStatus('completed', req, res);
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
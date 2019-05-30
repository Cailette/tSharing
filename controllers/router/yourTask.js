const taskContoroller = require('../model/task');

var yourTask = module.exports = {

	get: async function(req, res) {
        const tasks = await taskContoroller.getYourTasks(req.session.BOARD_ID, req.session.USER_ID);
		res.render('sharing', { page: 'yourTasks', tasks: tasks }); 
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
            status: 'assigned',
            private: 'Y'
        }  
        const createdTask = await taskContoroller.create(taskData);
        const newTask = await taskContoroller.getById(createdTask.id);
        
        if (newTask) {
            res.send({ task: newTask });
        } else {
            res.redirect('/');
        } 
	},
    
    filter: async function(req, res) {
        const BOARD_ID = req.session.BOARD_ID;
        const private = [{private: req.query.private}];
        const options = [{status: 'assigned'}];
        var tasks = [];
        
        if(req.query.private == 'N'){
            tasks = await taskContoroller.getYourTasks(BOARD_ID, req.session.USER_ID);
        } else {
            tasks = await taskContoroller.getYourPrivateTasks(BOARD_ID, req.session.USER_ID);
        }

        console.log("tasks: " + JSON.stringify(tasks));
        if (tasks) {
            res.send({ tasks: tasks });
        } else {
            res.redirect('/');
        } 
    },

	removeTask: async function(req, res) {
        const TASK_ID = req.query.idTask;
        const newTask = await taskContoroller.getById(TASK_ID);
        if (newTask.private == 'Y') {
            yourTask.updateStatus('deleted', req, res);
        } else {
            yourTask.updateStatus('free', req, res);
        }
	},

	completeTask: async function(req, res) {
        yourTask.updateStatus('completed', req, res);
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
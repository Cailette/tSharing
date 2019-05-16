const taskContoroller = require('../model/task');
userContoroller = require('../model/user');

var allTask = module.exports = {

	get: async function(req, res) {
        const order = [['date', 'ASC']];
        const options = [{status: 'assigned'}, {status: 'free'}];
        const tasks = await taskContoroller.getTasksWithOptions(req.session.BOARD_ID, order, options);
        const teammates = await userContoroller.getTeammates(req.session.BOARD_ID, req.session.USER_ID);
		res.render('sharing', { page: 'allTasks', tasks: tasks, teammates: teammates }); 
    },
    
	filterAndSort: async function(req, res) {
        const BOARD_ID = req.session.BOARD_ID
        const user = req.query.user;
        const order = [[req.query.sort, req.query.order]];
        const status = [{status: req.query.status}];
        const options = [{status: 'assigned'}, {status: 'free'}];
        var tasks = [];
        
        if(user == 'all'){
            if(req.query.status == 'all'){
                tasks = await taskContoroller.getTasksWithOptions(BOARD_ID, order, options);
            } else {
                tasks = await taskContoroller.getTasksWithOptions(BOARD_ID, order, status);
            }
        } else {
            if(req.query.status == 'all'){
                tasks = await taskContoroller.getUserTasksWithOptions(BOARD_ID, user, order, options);
            } else {
                tasks = await taskContoroller.getUserTasksWithOptions(BOARD_ID, user, order, status);
            }
        }

        console.log("tasks: " + JSON.stringify(tasks));
        if (tasks) {
            res.send({ tasks: tasks });
        } else {
            res.redirect('/');
        } 
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
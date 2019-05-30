const taskContoroller = require('../model/task');
const rateContoroller = require('../model/rate');

var archiveTask = module.exports = {

	get: async function(req, res) {
        const order = [['date', 'ASC']];
        const options = [{status: 'completed'}, {status: 'deleted'}];
        const tasks = await taskContoroller.getTasksWithOptions(req.session.BOARD_ID, order, options);
		const tasksRates = await rateContoroller.getRatingAvg(req.session.BOARD_ID);
		const userRates = await rateContoroller.getUserRates(req.session.USER_ID);
        const teammates = await userContoroller.getTeammates(req.session.BOARD_ID, req.session.USER_ID);
		res.render('sharing', { page: 'archivesTasks', userRates: userRates, 
								tasks: tasks, tasksRates: tasksRates, idUser: req.session.USER_ID,
								teammates: teammates }); 
	},
    
	filterAndSort: async function(req, res) {
        const BOARD_ID = req.session.BOARD_ID
        const user = req.query.user;
        const order = [[req.query.sort, req.query.order]];
        const status = [{status: req.query.status}];
        const options = [{status: 'completed'}, {status: 'deleted'}];
        var tasks = [];
        
        if(user == 'all'){
            if(req.query.status == 'all'){
                tasks = await taskContoroller.getTasksWithOptions(BOARD_ID, order, options);
            } else {
                if(req.query.status == 'private'){
					tasks = await taskContoroller.getTasksWithOptionsPrivate(BOARD_ID, order, options);
				} else {
					tasks = await taskContoroller.getTasksWithOptions(BOARD_ID, order, status);
				}
            }
        } else {
            if(req.query.status == 'all'){
                tasks = await taskContoroller.getUserTasksWithOptions(BOARD_ID, user, order, options);
            } else {
                if(req.query.status == 'private'){
					tasks = [];
				} else {
					tasks = await taskContoroller.getUserTasksWithOptions(BOARD_ID, user, order, status);
				}
            }
        }

		const tasksRates = await rateContoroller.getRatingAvg(req.session.BOARD_ID);
		const userRates = await rateContoroller.getUserRates(req.session.USER_ID);
        console.log("tasks: " + JSON.stringify(tasks));
        if (tasks) {
            res.send({tasks: tasks, tasksRates: tasksRates,  userRates: userRates, idUser: req.session.USER_ID});
        } else {
            res.redirect('/');
        } 
    },
	
	rate: async function(req, res) {
        const TASK_ID = req.query.idTask;
        const value = req.query.value;
		const existR = await rateContoroller.getUserRate(req.session.USER_ID, TASK_ID);

		if (existR) {
			const rateData = {
				value: value
			}  
			const updatedRate = await rateContoroller.update(rateData, existR.id);
			const updatedAvg = await rateContoroller.getRateAvg(TASK_ID);
			if (updatedAvg) {
				res.send({ avg: updatedAvg });
			} else {
				res.redirect('/');
			}
		} else {
			const rateData = {
				value: value,
				UserId: req.session.USER_ID,
				TaskId: TASK_ID
			}   
			const createdRate = await rateContoroller.create(rateData);
			const updatedAvg = await rateContoroller.getRateAvg(TASK_ID);
			if (updatedAvg) {
				res.send({ avg: updatedAvg });
			} else {
				res.redirect('/');
			}
		}
	}
}
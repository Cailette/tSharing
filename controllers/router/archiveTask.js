const taskContoroller = require('../model/task');
const rateContoroller = require('../model/rate');

var archiveTask = module.exports = {

	get: async function(req, res) {
		const tasks = await taskContoroller.getArchiveTasks(req.session.BOARD_ID);
		const tasksRates = await rateContoroller.getRatingAvg(req.session.BOARD_ID);
		const userRates = await rateContoroller.getUserRates(req.session.USER_ID);
		res.render('sharing', { page: 'archivesTasks', userRates: userRates, tasks: tasks, tasksRates: tasksRates, idUser: req.session.USER_ID}); 
	},

	rate: async function(req, res) {
        const TASK_ID = req.query.idTask;
        const value = req.query.value;
		const existR = await rateContoroller.getUserRate(req.session.BOARD_ID, TASK_ID);

		if (existR) {
			const rateData = {
				value: value
			}  
			const updatedRate = await rateContoroller.update(rateData, existR.id);
			if (updatedRate) {
				res.send({ rate: updatedRate });
			} else {
				res.redirect('/');
			}
		} else {
			const rateData = {
				value: value,
				UserId: req.session.USER_ID,
				TaskId: TASK_ID
			}   
			const createdRate = await userContoroller.create(rateData);
			if (createdRate) {
				res.send({ rate: createdRate });
			} else {
				res.redirect('/');
			}
		}
	}
}
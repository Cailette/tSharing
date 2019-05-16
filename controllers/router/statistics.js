const userContoroller = require('../model/user');
const boardContoroller = require('../model/board');
const taskContoroller = require('../model/task');

var statistics = module.exports = {

    get: async function(req, res, next) {
        const numberOfUsers = await userContoroller.countUsers(req.session.BOARD_ID);
        const numberOfTasks = await taskContoroller.countTasks(req.session.BOARD_ID);
        const numberOfUsersStats = await taskContoroller.getUsersStats(req.session.BOARD_ID);
        const teammates = await userContoroller.getTeammates(req.session.BOARD_ID, req.session.USER_ID);
        res.render('sharing', { page: 'statistics', teammates: teammates, numberOfUsers: numberOfUsers, 
                                                    numberOfTasks: numberOfTasks, numberOfUsersStats: numberOfUsersStats});   
    },

    statistics: async function(req, res, next) {
        const userNames = await userContoroller.getUserNames(req.session.BOARD_ID);
        const numberOfUsersStats = await taskContoroller.getUsersStats(req.session.BOARD_ID);
        var names = []
        if(userNames){
            for(i=0; i<userNames.length; i++){
                names[i] = userNames[i]["name"];
            }
        }
        res.send({ names: names, numberOfUsersStats: numberOfUsersStats });
    },
    
}
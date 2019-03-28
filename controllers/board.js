const Board = require('../models/board');

var board = module.exports = {

    create: async function(boardData, userData) {  
        return await Board.create(boardData)
            .then(board => {
                if(board) return board;
                return false;
            })
            .catch(err => {
                console.log('error: ' + err);
                return false;
            })
    },

    getByName: async function(boardName){
		return await Board.findOne({
            where: {
                name: boardName
            }
        }).then(board => {
                if(board) return board;
                return false;
        })
        .catch(err => {
            console.log('error: ' + err);
        })
    },

}
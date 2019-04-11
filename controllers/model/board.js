const Board = require('../../models/board');

var board = module.exports = {

    create: async function(boardData) {  
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

    delete: async function(idBoard) {
		return await Board.destroy({
            where: {
                idBoard: idBoard
            }
        }).then(() => {
            return true;
        })
        .catch(err => {
            console.log('error: ' + err);
            return false;
        })
    }, 

    getById: async function(idBoard){
		return await Board.findOne({
            where: {
                idBoard: idBoard
            }
        }).then(board => {
                if(board) return board;
                return false;
        })
        .catch(err => {
            console.log('error: ' + err);
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
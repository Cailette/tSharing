const Board = require( '../../models/index.js').Board;

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
                id: idBoard
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
                id: idBoard
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
var expect = require('chai').expect
const boardContoroller = require('../controllers/model/board');

describe('Models Board', function() {

    it('should not create board without password', async function() {
        const boardData = {
            name: "Test101"
        }  
        return await boardContoroller.create(boardData).then(function(result){
            expect(result).to.be.equal(false);
        });
    });

    it('should find board by name', async function() {
        return await boardContoroller.getByName("Friends").then(function(result){            
            expect(result.name).to.equal("Friends");
        });
    });

    it('should not find board by name', async function() {
        return await boardContoroller.getByName("Test101").then(function(result){
            expect(result).to.be.equal(false);
        });
    });
});
var expect = require('chai').expect
const testContoroller = require('../controllers/model/task');

describe('Models', function() {

    it('should not create task without title', async function() {
        const taskData = {
            comment: "some comment"
        }  
        return await testContoroller.create(taskData).then(function(result){
            expect(result).to.be.equal(false);
        });
    });

    it('should not create task without idBoard', async function() {
        const taskData = {
            title: "title",
            comment: "comment",
            idUser: 1
        }  
        return await testContoroller.create(taskData).then(function(result){
            expect(result).to.be.equal(false);
        });
    });

    it('should find task by id', async function() {
        return await testContoroller.getById("1").then(function(result){            
            expect(result.idTask).to.equal(1);
        });
    });

    it('should not find task by id', async function() {
        return await testContoroller.getById("0").then(function(result){
            expect(result).to.be.equal(false);
        });
    });
});
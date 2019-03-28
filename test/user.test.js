var expect = require('chai').expect
const userContoroller = require('../controllers/user');

describe('Models', function() {

    it('should not create user without password', async function() {
        const userData = {
            email: "test@test.com"
        }  
        return await userContoroller.create(userData).then(function(result){
            expect(result).to.be.equal(false);
        });
    });

    it('should not create user without idBoard', async function() {
        const userData = {
            email: "test@test.com",
            name: "Test",
            password: "Password"
        }  
        return await userContoroller.create(userData).then(function(result){
            expect(result).to.be.equal(false);
        });
    });

    it('should find user by email', async function() {
        return await userContoroller.getByEmail("test@test.com").then(function(result){            
            expect(result.email).to.equal("test@test.com");
        });
    });

    it('should not find user by email', async function() {
        return await userContoroller.getByEmail("test100@test.com").then(function(result){
            expect(result).to.be.equal(false);
        });
    });
});
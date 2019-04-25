var expect = require('chai').expect
const userContoroller = require('../controllers/model/user');

describe('Models User', function() {

    it('should not create user without password', async function() {
        const userData = {
            email: "ala@ala.com"
        }  
        return await userContoroller.create(userData).then(function(result){
            expect(result).to.be.equal(false);
        });
    });

    it('should not create user without idBoard', async function() {
        const userData = {
            email: "ala@ala.com",
            name: "Ala",
            password: "Password"
        }  
        return await userContoroller.create(userData).then(function(result){
            expect(result).to.be.equal(false);
        });
    });

    it('should find user by email', async function() {
        return await userContoroller.getByEmail("ala@ala.com").then(function(result){            
            expect(result.email).to.equal("ala@ala.com");
        });
    });

    it('should not find user by email', async function() {
        return await userContoroller.getByEmail("test100@test.com").then(function(result){
            expect(result).to.be.equal(false);
        });
    });
});
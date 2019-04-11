const assert = require('assert');
const expect = require('chai').expect
const request = require('supertest');
const app = require('../app')
const userContoroller = require('../controllers/model/user');

let req = {
    body: {},
};

let res = {
    sendCalledWith: '',
    send: function(arg) { 
        this.sendCalledWith = arg;
    }
};

describe('Unit testing the /account route', function() {

      it('should not find teammates', async function() {
          return await userContoroller.getTeammates(0).then(function(result){
              expect(result).to.be.empty;
          });
      });
  
      it('should find teammate', async function() {
          return await userContoroller.getTeammates(1).then(function(result){
              expect(result).to.be.lengthOf(2);
          });
      });
});
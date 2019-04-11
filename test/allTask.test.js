const assert = require('assert');
const expect = require('chai').expect
const request = require('supertest');
const app = require('../app')
const userContoroller = require('../controllers/model/task');

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

     it('should return ERR status for not loged in user', function() {
        return request(app)
          .get('/allTasks')
          .then(function(response){
              assert.equal(response.status, 404)
          })
      });
});
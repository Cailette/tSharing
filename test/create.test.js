const assert = require('assert');
const expect = require('chai').expect
const request = require('supertest');
const app = require('../app')
const { get, post } = require('../controllers/create');
const { validateCreateForm } = require('../controllers/validateFormInput');

let req = {
    body: {},
};

let res = {
    sendCalledWith: '',
    send: function(arg) { 
        this.sendCalledWith = arg;
    }
};

describe('Unit testing the /create route', function() {

    it('should return OK status', function() {
      return request(app)
        .get('/create')
        .then(function(response){
            assert.equal(response.status, 200)
        })
    });

    it('should not contain alert on rendering GET', function() {
        return request(app)
          .get('/create')
          .then(function(response){
              expect(response.text).not.contain("alert");
          })
      });

    it('should contain alert on rendering POST', function() {
        let newReq = req;
        newReq.body = {
            bName: ".",
            bPassword: ".",
            bPasswordMatch: "t",
            uName: ".",
            uPassword: ".",
            uPasswordMatch: "t"
        }

        return request(app)
          .post('/create', newReq, res)
          .then(function(response){
              expect(response.text).to.contain("alert");
          })
      });
});
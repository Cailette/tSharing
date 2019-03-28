const assert = require('assert');
const expect = require('chai').expect
const request = require('supertest');
const app = require('../app')

describe('Unit testing the /invitation route', function() {

    it('should return OK status', function() {
      return request(app)
        .get('/invitation')
        .then(function(response){
            assert.equal(response.status, 200)
        })
    });
});
var request = require('supertest');
var app = require('../index');
var expect = require('chai').expect;

describe('Login API', function() {
  it('Test Login success if credential is valid', function(done) {
    request(app)
     .post('/login')
         .send({email: 'vicky@gmail.com', password: '1234'})
         .set('Accept', 'application/json')
         .set('Content-Type', 'application/x-www-form-urlencoded')
         .expect(function(response) {
            expect(response.body).not.to.be.empty;
            expect(response.body).to.be.an('object');
         })
         .end(done);
  });
});

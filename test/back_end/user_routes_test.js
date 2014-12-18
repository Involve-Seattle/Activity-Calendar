'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');
var User = require('../../models/user');

chai.use(chaihttp);

require('../../server');

var expect = chai.expect;

var email = new Buffer('test@example.com', 'ascii').toString('base64');
var password = new Buffer('testtest', 'ascii').toString('base64');
var authorization = 'Basic ' + new Buffer('test@example.com:testtest', 'ascii').toString('base64');

before(function(done) {
  User.remove({}, function(err) {
    if (err) return console.log(err + ' dusting');
    console.log('db cleared');
  });
  done();
});

after(function(done) {
  User.remove({}, function(err) {
    if (err) return console.log(err + ' dusting');
    console.log('db cleared');
  });
  done();
});

describe('create and login user', function() {

  it('should create a user', function(done) {
    chai.request('http://localhost:3000')
    .post('/api/newUser')
    .send({
      email: email,
      password: password,
      passwordConfirmation: password,
      locations: 'testCity'
    })
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body).to.have.property('jwt');
      User.findOne({email: 'test@example.com'}, function(err, user) {
        expect(user).to.not.eql(undefined);
        expect(user).to.have.property('locations');
        expect(user.locations).to.eql('testCity');
      });
      done();
    });
  });

  it('should login user', function(done) {
    chai.request('http://localhost:3000')
    .get('/api/login')
    .set({
      authorization: authorization
    })
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body).to.have.property('jwt');
      done();
    });
  });
});

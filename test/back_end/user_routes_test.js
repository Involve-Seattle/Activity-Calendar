'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');
var User = require('../../models/user');

chai.use(chaihttp);

require('../../server');

var expect = chai.expect;

var email = new Buffer('testYourself@example.com', 'ascii').toString('base64');
var password = new Buffer('Test2@', 'ascii').toString('base64');
var authorization = 'Basic ' + new Buffer('testYourself@example.com:Test2@', 'ascii').toString('base64');

before(function(done) {
  User.remove({}, function(err) {
    if (err) return console.log(err + ' dusting');
    done();
  });
});

after(function(done) {
  User.remove({}, function(err) {
    if (err) return console.log(err + ' dusting');
    done();
  });
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
      User.findOne({locations: 'testCity'}, function(err, user) {
        expect(user).to.not.eql(undefined);
        expect(user).to.have.property('locations');
        expect(user.locations).to.eql('testCity');
        done();
      });
    });
  });

  it('should not let user submit blank password on signup', function(done) {
    chai.request('http://localhost:3000')
    .post('/api/newUser')
    .send({
      email: email,
      password: '',
      passwordConfirmation: password,
      locations: 'seattle'
    })
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body).to.not.have.property('jwt');
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

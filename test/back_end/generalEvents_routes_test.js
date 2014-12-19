'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');
var GeneralEvents = require('../../models/generalEvents');
var User = require('../../models/user');
chai.use(chaihttp);

require('../../server');

var expect = chai.expect;

var email = new Buffer('test@example.com', 'ascii').toString('base64');
var password = new Buffer('Test1@', 'ascii').toString('base64');
var authorization = 'Basic ' + new Buffer('test@example.com:Test1@', 'ascii').toString('base64');
var token;

before(function(done) {
  GeneralEvents.remove({}, function(err) {
    if (err) return console.log(err);
  });

  var newEvent = new GeneralEvents();
  newEvent.eventTitle = 'test Title';
  newEvent.eventDate = 'testDate';
  newEvent.eventAddress = 'test address';
  newEvent.save(function(err, data) {
  });
  done();
});

after(function() {
  GeneralEvents.remove({}, function(err) {
    if (err) return console.log(err);
  });

  User.remove({}, function(err) {
    console.log('users cleaned');
  });
});

describe('generalEvents request', function() {

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
      token = res.body.jwt;
      done();
    });
  });

  it('should pull events from db', function(done) {
    chai.request('http://localhost:3000')
    .get('/api/events')
    .set({jwt:token})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body[0]).to.have.property('eventTitle');
      done();
    });
  });

});

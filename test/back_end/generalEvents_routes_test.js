'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');
var GeneralEvents = require('../../models/generalEvents');
chai.use(chaihttp);

require('../../server');

var expect = chai.expect;

var token;

before(function() {
  GeneralEvents.remove({}, function(err) {
    if (err) return console.log(err);
    console.log('db cleaned');
  });

  var newEvent = new GeneralEvents();
  newEvent.eventTitle = 'test Title';
  newEvent.eventDate = 'testDate';
  newEvent.eventAddress = 'test address';
  newEvent.save(function(err, data) {
  });
});

after(function() {
  GeneralEvents.remove({}, function(err) {
    if (err) return console.log(err);
    console.log('db cleaned');
  });
});

describe('generalEvents request', function() {

  it('should pull events from db', function(done) {
    chai.request('http://localhost:3000')
    .get('/api/events')
    // .set({jwt:token})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body[0]).to.have.property('eventTitle');
      done();
    });
  });

});

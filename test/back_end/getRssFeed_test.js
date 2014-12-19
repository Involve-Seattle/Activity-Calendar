'use strict';

var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var GetRSS = require('../../lib/getRssFeed');

describe('fetching the event feed', function() {
  var getRSS;
  var mock;

  before(function() {
    getRSS = new GetRSS();
    mock = sinon.mock(getRSS);
  });

  after(function() {
    mock.verify;
    mock.restore;
  });

  it('gets the feed and calls the function to save to the DB', function() {
    mock.expects('saveToDB').atLeast(1);
    getRSS.getFeed();
  });
});

describe('timer on the getRssFeed', function() {
  var getRSS
  var mock;

  before(function() {
    this.clock = sinon.useFakeTimers();
    getRSS = new GetRSS();
  });

  after(function() {
    this.clock.restore();
  });

  it('gets the feed and calls the saveToDB function once a day', function() {
    var spy = sinon.spy();

    setTimeout(function() {
      getRSS.saveToDB(spy);
    }, 86400000);

    this.clock.tick(86339999);
    expect(spy).to.not.be.called;

    this.clock.tick(3);
    expect(spy).to.be.called;
  });
});

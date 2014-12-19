'use strict';

var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var getRSS = require('../../lib/getRssFeed');

describe('fetching the event feed', function() {
  var mock;

  before(function() {
    mock = sinon.mock(getRSS);
  });

  // it('calls the set interval function', function() {
  //   mock.expects(setInterval).once();
  //   getRSS();
  // });

  after(function() {
    mock.verify;
    mock.restore;
  });
});

describe('it pulls from the feed and updates the database every 24 hours', function() {
  // it ('pulls from the feed and updates the database every 24 hours', function() {
  //   var clock = sinon.useFakeTimers();

  //   getRSS.setInterval();

  //   clock.tick(86400000)

  // });
});

// var clock = sinon.useFakeTimers();

// var hidden =
// $("<div hidden="">Peekaboo</div>")
// .appendTo(document.body).fadeIn("slow");

// clock.tick(650); // slow = 600ms
// hidden.css("opacity") === 1; // true

// clock.restore();

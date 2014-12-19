'use strict';

var gfeed = require('google-feed-api');
var GeneralEvents = require('../models/generalEvents');

function GetRss() {
};

GetRss.prototype.getFeed = function() {
  var _this = this;

  var feed = new gfeed.Feed('http://www.trumba.com/calendars/seattle-city-council.rss');
  feed.setNumEntries(10);

  setInterval(feed.listItems(function(items) {
    GeneralEvents.remove({}, function(err) {
      if (err) return console.log(err);
    });
    for (var i = 0; i < items.length; i++) {
      _this.saveToDB(i, items);
    }
  }), 86400000);

};

GetRss.prototype.saveToDB = function(i, items) {
  var newEvent = new GeneralEvents();
  newEvent.eventTitle = items[i].title;
  var date = new Date(items[i].publishedDate);
  newEvent.eventDate = date.toDateString() + ' ' + date.toLocaleTimeString();
  var contentLong = items[i].contentSnippet.split(' ');
  newEvent.eventContentLong = contentLong;
  newEvent.eventUrl = items[i].link;
  newEvent.eventContent = items[i].contentSnippet;
  newEvent.save(function(err, data) {
    if (err) return console.log(err);
  });//jshint ignore:line
};

module.exports = GetRss;

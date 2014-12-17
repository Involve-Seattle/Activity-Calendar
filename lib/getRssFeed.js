'use strict';

var gfeed = require('google-feed-api');
var GeneralEvents = require('../models/generalEvents');

module.exports = function() {

  var feed = new gfeed.Feed('http://www.trumba.com/calendars/seattle-city-council.rss');
  feed.setNumEntries(10);

  setInterval(feed.listItems(function(items) {
    GeneralEvents.remove({}, function(err) {
      if (err) return console.log(err);
    });
    for (var i = 0; i < items.length; i++) {
      var newEvent = new GeneralEvents();
      newEvent.eventTitle = items[i].title;
      newEvent.eventDate = items[i].publishedDate;
      var contentLong = items[i].contentSnippet.split(' ');
      newEvent.eventContentLong = contentLong;
      newEvent.eventUrl = items[i].link;
      newEvent.eventContent = items[i].contentSnippet;
      newEvent.save(function(err, data) {
        console.log(data);
        if (err) return console.log(err);
      });//jshint ignore:line
    }
  }), 86400000);
};

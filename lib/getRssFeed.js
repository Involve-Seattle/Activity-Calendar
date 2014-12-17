'use strict';

var gfeed = require('google-feed-api');
var GeneralEvents = require('../models/generalEvents');

module.exports = function() {

  var feed = new gfeed.Feed('http://www.trumba.com/calendars/seattle-city-council.rss');

  setInterval(feed.listItems(function(items) {
    for (var i = 0; i < items.length; i++) {
      // GeneralEvents.findOne({eventTitle: items[i].title}, function(err, data) {
      //   if (err) return console.log(err);
      // };
      var newEvent = new GeneralEvents();
      newEvent.eventTitle = items[i].title;
      newEvent.eventDate = items[i].publishedDate;
      // newEvent.eventAddress = items[i].content;
      newEvent.save(function(err, data) {
        console.log(data);
      }); //jshint ignore:line
      console.log(items[i].title);
    }
  }), 86400000);
};

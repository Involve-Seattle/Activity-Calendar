'use strict';

var mongoose = require('mongoose');

//creates mymeetings
var genEventSchema = mongoose.Schema({

  eventTitle: String,
  eventContentLong: String,
  eventDate: String,
  eventUrl: String,
  eventContent: String

});

// genEventSchema.methods.dailyBatch = function() {
//   //set up feed

//   //set timeout

//   //call the database stuff

// };

// genEventSchema.methods.eventsToDatabase = function() {

// };

module.exports = mongoose.model('GeneralEvents', genEventSchema);

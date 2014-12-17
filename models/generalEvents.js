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

module.exports = mongoose.model('GeneralEvents', genEventSchema);

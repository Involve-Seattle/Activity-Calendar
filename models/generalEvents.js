'use strict';

var mongoose = require('mongoose');

//creates mymeetings
var genEventSchema = mongoose.Schema({

  eventTitle: String,
  eventAddress: String,
  eventDate: String

});

module.exports = mongoose.model('GeneralEvents', genEventSchema);

'use strict';

var mongoose = require('mongoose');

//creates mymeetings
var myMeetSchema = mongoose.Schema({

  userName: String,
  myMeetTitle: String,
  myMeetAddress: String,
  myMeetTime: String

});

module.exports = mongoose.model('MyMeet', myMeetSchema);

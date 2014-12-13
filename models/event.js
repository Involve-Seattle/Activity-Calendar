'use strict';

var mongoose = require('mongoose');

//creates mymeetings
var myMeetSchema = mongoose.Schema({

  userName: String,
  myMeetTitle: String,
  myMeetLocation: String,
  myMeetTime: Date,
  invitees: [
  {
    name: String,
    email: String
  }]

});

module.exports = mongoose.model('MyMeeting', myMeetSchema);

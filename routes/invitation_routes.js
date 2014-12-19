'use strict';

var User = require('../models/user');
var sendgrid = require('sendgrid')(process.env.API_USER, process.env.API_KEY);
var validator = require('validator');

module.exports = function(app) {
  app.post('/api/invitation', function(req, res) {
    if (!(validator.isEmail(req.body.friendInfo.friendEmail))) {
      return res.status(500).send('that is not a valid email');
    }
    sendgrid.send({
      to: req.body.friendInfo.friendEmail,
      from: 'involve.herokuapp@gmail.com',
      subject: 'A Friend Has Invited You to a Meeting!',
      html: '<h3>' + req.body.friendInfo.friendMessage + '</h3><h2>' + req.body.eventInfo.eventTitle + '</h2><p>' + req.body.eventInfo.eventDate + '</p><a href=' + '"' + req.body.eventInfo.eventUrl + '">seattle.gov</a>'
    }, function(err, json) {
      if (err) { return console.error(err); }
      res.send(json);
    });
  });
};

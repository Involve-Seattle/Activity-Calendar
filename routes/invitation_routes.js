'use strict';

var User = require('../models/user');
var sendgrid = require('sendgrid')(process.env.API_USER, process.env.API_KEY);
var validator = require('validator');

module.exports = function(app) {
  app.post('/api/invitation', function(req, res) {
    if (!(validator.isEmail(req.body.friendInfo.friendEmail))) {
      return res.status(500).send('that is not a valid email');
    }
    console.log(req.body);

    User.findOne({email: req.body.email}, function(err, user) {
      if (err) return res.status(500).send('there was an error' + err);
      sendgrid.send({
        to: req.body.friendInfo.friendEmail,
        from: 'chareesagraham@gmail.com',
        subject: 'A Friend Has Invited You to a Meeting!',
        html: '<h4>' + req.body.friendInfo.friendMessage + '</h4><h3>' + req.body.eventInfo.eventTitle + '</h3><p>' + req.body.eventInfo.eventDate + '<p>'
      }, function(err, json) {
        if (err) { return console.error(err); }
        res.send(json);
      });
    });
  });
};

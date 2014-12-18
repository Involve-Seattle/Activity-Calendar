'use strict';

var User = require('../models/user');
var sendgrid = require('sendgrid')(process.env.API_USER, process.env.API_KEY);
var validator = require('validator');

module.exports = function(app) {
  app.post('/api/invitation', function(req, res) {
    console.log('body.friendEmail', req.body.friendEmail);
    if (!(validator.isEmail(req.body.friendEmail))) {
      return res.status(500).send('that is not a valid email');
    }
    console.log('we made it to the route STILL!');
    User.findOne({email: req.body.email}, function(err, user) {
      if (err) return res.status(500).send('there was an error' + err);
      console.log('INSIDE findOne');
      sendgrid.send({
        to: req.body.friendEmail,
        from: 'chareesagraham@gmail.com',
        subject: 'A Friend Has Invited You!',
        text: 'this is CHAREESA!'
      }, function(err, json) {
        if (err) { return console.error(err); }
        res.send(json);
      });
    });
  });
};

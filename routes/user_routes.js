'use strict';

var User = require('../models/user');
var decode = require('../lib/decode');
var jwt = require('jwt-simple');

module.exports = function(app, passport) {
  app.post('/api/newUser', function(req, res) {
    var info = decode(req.body);

    User.findOne({'basic.email': info.email}, function(err, user) {
      if (err) return res.status(500).send('server error');
      //check if user already exists
      if (user) return res.status(500).send('cannot create that user');

      var newUser = new User();
      newUser.basic.email = info.email;
      newUser.basic.password = newUser.generateHash(info.password);
      newUser.locations = req.body.locations;
      newUser.save(function(err, data) {
        if (err) {
          return res.status(500).send('server error');
        }
        res.json({jwt: newUser.generateToken(app.get('jwtSecret'))});
      });
    });
  });

  app.get('/api/login', passport.authenticate('basic', {session: false}), function(req, res) {
    res.json({jwt: req.user.generateToken(app.get('jwtSecret'))});
  });
};

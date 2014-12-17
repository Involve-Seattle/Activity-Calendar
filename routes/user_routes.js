'use strict';

var User = require('../models/user');
var decode = require('../lib/decode');

module.exports = function(app) {
  app.post('/api/newUser', function(req, res) {
    var info = decode(req.body);
    var regex = /[a-zA-Z0-9_]{5,}/;

    if (!regex.test(req.body.password)) return res.status(504).send('invalid password');

    var newUser = new User();
    newUser.email = info.email;
    newUser.password = info.password;
    newUser.locations = req.body.locations;
    newUser.save(function(err) {
      if (err) {
        console.log(err);
        return res.status(500).send('server error yo');
      }
      res.json({jwt: newUser.generateToken(app.get('jwtSecret'))});
    });
  });

  app.get('/', function(req, res) {
    res.sendFile('../app/index.html');
  });

  app.get('/api/login', function(req, res) {
    var info = decode(req.headers);

    User.findOne({email: info.email}, function(err, user) {
      if (err) return res.status(404).send('server error');

      if (!user) return res.status(404).send('access error');

      res.json({jwt: user.generateToken(app.get('jwtSecret'))});
    });
  });

};

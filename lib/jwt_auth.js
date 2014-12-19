'use strict';
var User = require('../models/user');
var jwt = require('jwt-simple');

module.exports = function(secret) {
  return function(req, res, next) {
    var token = req.headers.jwt || req.body.jwt;

    var decoded;
    try {
      decoded = jwt.decode(token, secret);
    } catch (err) {
      console.log(err);
      return res.status(403).send('access denied');
    }
    User.findOne({_id: decoded.iss}, function(err, user) {
      if (err) return res.status(403).send('access denied');
      if (!user) return res.status(403).send('access denied');

      req.user = user;
      next();
    });
  };
};

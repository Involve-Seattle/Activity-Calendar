'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');

var userSchema = mongoose.Schema({
  email: String,
  password: String,
  locations: [
  {
    cityName: String

  }]
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(4), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateToken = function(secret) {
  // var day = 86400000;
  var week = 604800000;
  var expires = Date.now() + week;
  var _this = this;
  var token = jwt.encode({
    iss: _this._id,
    expire: expires
  }, secret);
  return token;
};

module.exports = mongoose.model('User', userSchema);

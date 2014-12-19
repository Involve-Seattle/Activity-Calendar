'use strict';

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var GetRSS = require('./lib/getRssFeed');

var passport = require('passport');

var app = express();

app.use(bodyParser.json());

if (process.env.BUILD_KEY === 'build') {
  app.use(express.static(__dirname + '/build'));
}
if (process.env.BUILD_KEY === 'production') {
  app.use(express.static(__dirname + '/prodBuild'));
}

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/mymeetings_development');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db connected, WELCOME to involve.. the place of magic...');
});

app.set('jwtSecret', process.env.JWT_secret || 'getanewone');

app.use(passport.initialize());
//
require('./lib/passport')(passport);
var jwtauth = require('./lib/jwt_auth')(app.get('jwtSecret'));

var eventsRouter = express.Router();
eventsRouter.use(jwtauth);

require('./routes/user_routes')(app, passport);
require('./routes/generalEvents_routes')(eventsRouter);
require('./routes/mymeets_routes')(app);
require('./routes/invitation_routes')(eventsRouter);
app.use('/', eventsRouter);

app.set('port', process.env.PORT || 3000);

(function() {
  var getRss = new GetRSS();
  getRss.getFeed();
}());

app.listen(app.get('port'), function() {
  console.log('listening to ' + app.get('port'));
});

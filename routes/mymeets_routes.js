'use strict';

var MyMeet = require('../models/mymeets');

module.exports = function(app) {
  app.post('/api/mymeet', function(req, res) {
    var newMeet = new MyMeet(req.body);
    newMeet.save(function(err, data) {
      if (err) return res.status(500).send('server error');
      res.json(data);
    });
  });
};

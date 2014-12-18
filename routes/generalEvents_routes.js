'use strict';

var GeneralEvents = require('../models/generalEvents');

module.exports = function(app) {
  app.get('/api/events', function(req, res) {
    GeneralEvents.find({}, function(err, data) {
      if (err) res.status(500).send('server error');
      res.json(data);
    });
  });
};

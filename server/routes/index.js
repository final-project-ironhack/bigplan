/*jshint esversion: 6*/
const path = require('path');

module.exports = function(app) {

  app.use('/api/event', require('../api/event'));
  app.use('/api/user', require('../api/user'));
//  app.use('/api/rating-event', require('../api/rating-event'));
//  app.use('/api/rating-user', require('../api/rating-user'));

	// catch 404 and forward to Angular
  app.all('/*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
  });
  return app;
};

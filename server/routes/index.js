<<<<<<< HEAD
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
=======
/*jshint esversion: 6*/
const path = require('path');

module.exports = function(app) {

  app.use('/api/event', require('../api/event'));
  app.use('/api/user', require('../api/user'));
  app.use('/api/rating-event', require('../api/rating-event'));
  app.use('/api/rating-user', require('../api/rating-user'));

	// catch 404 and forward to Angular
  app.all('/*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
  });
  return app;
};
>>>>>>> fb20aaf134d1f580ccb231d36df67efc97209706

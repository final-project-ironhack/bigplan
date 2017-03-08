/*jshint esversion: 6*/
mongoose = require( ' mongoose' );
eventModel = require('./ratingUser.model.js');

exports.createRatingUser = (req, res, next) => {
  const newRatingUser = new ratingEvent({
    punctual: req.body.punctual,
    responsable: req.body.responsable,
    funny: req.body.funny,
    average: req.body.average
  });


};

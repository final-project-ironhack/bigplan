/*jshint esversion: 6*/
const mongoose = require( 'mongoose' );
const eventModel = require('./ratingEvent.model.js');

exports.createRatingEvent = (req, res, next) => {
  const newRatingEvent = new ratingEvent({
    eventOwner: req.body.eventOwner,
    eventQuality: req.body.eventQuality,
    managment: req.body.managment,
    average: req.body.average
  });
  newRatingEvent.save((err, ratingEvent) => {
    if(err){
      console.log(err);
      return res.send(500);
    }
    //COMPROBAR SI FUNCTIONA
    eventModel.update(
      {_id: req.params._id},
      { $push: { rating: ratingEvent._id}},
      () => {
        return res.send(ratingEvent);
      });
    });
};

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
    eventModel.update(
      {_id: ratingevent.event},
      { $push: { rating: ratingEvent._id}},
      () => {
        return res.send(ratingEvent);
      });
    });
};

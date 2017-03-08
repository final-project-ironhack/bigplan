/*jshint esversion: 6*/
mongoose = require( 'mongoose' );
eventModel = require('./ratingUser.model.js');

exports.createRatingUser = (req, res, next) => {
  const newRatingUser = new ratingUser({
    punctual: req.body.punctual,
    responsable: req.body.responsable,
    funny: req.body.funny,
    average: req.body.average
  });
  newRatingUser.save((err, ratingUser) => {
    if(err){
      console.log(err);
      return res.send(500);
    }
    userModel.update(
      {_id: ratingUser.user},
      { $push: { rating: ratingUser._id}},
      () => {
        return res.send(ratingUser);
      });
    });
};

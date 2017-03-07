/*jshint esversion: 6*/
mongoose = require( ' mongoose' );
userModel = require( './user.model');

exports.createEvent = (req, res, next) => {
  let creator;
  creator = userModel.findOne({email: req.body.email})._id;

  const newEvent = new eventModel({
    name: req.body.name,
    category: req.body.category,
    tags: req.body.tags,
    description: req.body.description,
    image: req.body.image,
    status: true,
    creator: creator
  });

  newEvent.save((err, event) => {
    if(err){
      return res.send(500);
    }
  });
};

exports.editEvent

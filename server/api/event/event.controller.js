/*jshint esversion: 6*/
mongoose = require( ' mongoose' );
eventModel = require( './event.model');
userModel = require( './user.model');

exports.createEvent = (req, res, next) => {
  let eventCreator;

  userModel.findOne({email: req.body.email}, (err, user)=> {
    eventCreator = user._id;
  });

  const newEvent = new eventModel({
    name: req.body.name,
    category: req.body.category,
    tags: req.body.tags,
    description: req.body.description,
    image: req.body.image,
    status: true,
    creator: eventCreator
  });

  newEvent.save((err, event) => {
    if(err){
      return res.send(500);
    }
  });

  userEvent.findOne({email: req.body.email}, (err, user)=> {
    creator = user._id;
  });
  //introduce el evento a su creador
  userModel.findByIdAndUpdate(eventCreator,
  { $push: { createdEvents: newEvent._id }}, () =>{
    return res.send(event);
  });
};

exports.editEvent = (req, res, next) => {
  const eventId = req.params.id;

  eventModel.findByIdAndRemove(eventId, {
    $set: req.body
  }, (err, user) => {
    if(err){
      return res.status(400).json({
        message: 'Unable to update event',
        error: err
      });
    }
  });
};

exports.finishEvent = (req, res) => {
  const eventId = req.params.id;
  eventModel.findByIdAndUpdate(eventId, {
    $set: {status: false}
  }, (err, user) => {
    if(err){
      return res.status(400).json({
        message: 'unable to finish event',
        error: err
      });
    }
    res.json({
      message: 'event succesfully finished',
      event: event
    });
  });
};

exports.removeEvent = (req, res) => {
  userModel.findByIdAndRemove(req.params.id, (err) => {
      if(err){
        res.json({
          message: 'impossible to remove event',
          error: err
        });
      }
    });
};

/*jshint esversion: 6*/
const mongoose = require('mongoose');
const eventModel = require('./event.model');
const userModel = require('../user/user.model');

exports.createEvent = (req, res, next)  => {
    console.log(req.body.mail);
    userModel
    .findOne({email: req.body.email})
    .then((user) => {
      console.log("Creating event");
      console.log(user);
      const userEvent = new eventModel({
          name: req.body.name,
          category: req.body.category,
          tags: req.body.tags,
          description: req.body.description,
          image: req.body.image,
          status: true,
          creator: user._id
      })
      .save()
      .then((event) => userModel.findByIdAndUpdate(user._id, {$push: {createdEvents: newEvent._id}}));
    })
    .then((user) => res.status(200).json({message:"Event has been created"}))
    .catch((err) => {console.log(err); res.status(500).json({message:"Event has been created"});});
};

exports.editEvent = (req, res, next) => {
    const eventId = req.params.id;

    eventModel.findByIdAndUpdate(eventId, {
        $set: req.body
    }, (err, user) => {
        if (err) {
            return res.status(400).json({
                message: 'Unable to update event',
                error: err
            });
        }
        else{
          return res.status(200).json({
            message: 'event update'
          });
        }
    });
};

exports.finishEvent = (req, res) => {
    const eventId = req.params.id;
    eventModel.findByIdAndUpdate(eventId, {
        $set: {
            status: false
        }
    }, (err, event) => {
        if (err) {
            return res.status(400).json({
                message: 'unable to finish event',
                error: err
            });
        }
            return res.status(200).json({
              message: 'event succesfully finished'
        });
    });
};

exports.getAllEvents = (req, res, next) => {
    eventModel.find({}, (err, events) => {
        if (err) {
            return res.json(err);
        }
        return res.json(events);
    });
};

exports.removeEvent = (req, res) => {
    userModel.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.json({
                message: 'impossible to remove event',
                error: err
            });
        }
    });
};

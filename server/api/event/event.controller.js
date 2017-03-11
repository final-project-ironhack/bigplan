/*jshint esversion: 6*/
const mongoose = require('mongoose');
const eventModel = require('./event.model');
const userModel = require('../user/user.model');

exports.createEvent = (req, res, next) => {
    console.log("email", req.body);
    userModel
        .findOne({
            _id: req.session.currentUser._id
        }).exec((err, user) => {
            console.log("Creating event");
            const eventCreated = {
                name: req.body.name,
                category: req.body.category,
                tags: req.body.tags,
                description: req.body.description,
                image: req.body.image,
                status: true,
                creator: user._id
            };
            eventModel.create(eventCreated, (err, event) => {
                if (err) {
                    return next(err);
                } else {
                    userModel.update({
                        _id: user._id
                    }, {
                        $push: {
                            createdEvents: event._id
                        }
                    }, (err) => {
                        if (err) return next(err);
                        return res.status(200).json({
                            message: "Event has been createdand user updated"
                        });
                    });
                }
            });
            // userModel
            //     .findOne({
            //         email: req.body.email
            //     })
            //     .then((user) => {console.log(user);
            //         userModel.update({_id: user._id}, {
            //             $push: {
            //                 createdEvents: event._id
            //             }
            //         }, (err)=>{
            //           if(err) return next(err);
            //         });
            //     });
            // });
            // //  .then((user) => res.status(200).json({message:"Event has been created"}))
            // .catch((err) => {
            //     console.log(err);
            //     res.status(500).json({
            //         message: "Event has been created"
            //     });
        });
};

exports.goEvent = (req, res, next) => {
    const eventId = req.params.id;

    eventModel.update({
        _id: eventId

    }, {
        $push: {
            participant: req.session._id
        }
    });

    userModel.update({
      _id: req.session._id
    }, {
      $push: {
        assistedEvents: eventId
      }
    });
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
        } else {
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
            return res.status(500).json(err);
        }
        console.log(events);
        return res.status(200).json(events);
    });
};


//Commented because it crashed when not logged-in
// exports.getEventByParams((req, res, next) => {
//     editEvent.find({
//         _id: params.id
//     }, (err, event) => {
//         if (err) {
//             return res.status(500).json(err);
//         }
//         return res.status(200).json(event);
//     });
// });



exports.removeEvent = (req, res, next) => {
    eventModel.findById(req.params.id, (err, event) => {
        if (err) {
            return res.status(400).json({
                message: 'impossible to remove event',
                error: err
            });
        } else {
            event.remove((event) => {
                if (err) return next(err);
                return res.status(200).json({
                    message: 'event removed'
                });
            });
        }
    });
};

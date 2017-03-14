/*jshint esversion: 6*/
const mongoose = require('mongoose');
const eventModel = require('./event.model');
const userModel = require('../user/user.model');

let Server = require('socket.io');
//add options as params to server if want change pings
let io = new Server();

let listOfEvents;

exports.createEvent = (req, res, next) => {
    console.log("email", req.body);
    userModel
        .findOne({
            _id: req.body.creator
        }).exec((err, user) => {
            console.log("Creating event");
            const eventCreated = {
                name: req.body.name,
                category: req.body.category,
                tags: req.body.tags,
                description: req.body.description,
                image: req.body.image,
                status: true,
                rating: [],
                creator: req.body.creator,
                participant: [],
                location: {location:req.body.location}
            };
            console.log(eventCreated);
            eventModel.create(eventCreated, (err, event) => {
                if (err) {
                    return next(err);
                } else {
                    userModel.update({
                        _id: req.body.creator
                    }, {
                        $push: {
                            createdEvents: event._id
                        }
                    }, (err) => {
                        if (err) return next(err);
                        //socket.io
                        updateEvents();
                        return res.status(200).json({
                            message: "eventCreated"
                        });
                    });
                }
            });
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
        listOfEvents = events;
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

function updateEvents() {
    eventModel.find({}, (err, events) => {
        if (err) {
            console.log(err);
        }
        listOfEvents = events;
        console.log(listOfEvents);
    });
}


io.on('eventCreated', (socket) => {
    io.send("updateSocketListOfEvents", clientListNames);
});

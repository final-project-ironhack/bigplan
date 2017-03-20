/*jshint esversion: 6*/
const mongoose = require('mongoose');
const eventModel = require('./event.model');
const userModel = require('../user/user.model');

//socket.io
const SOCKET_IO_PORT = 8888;
const http = require('http').Server(app);
const io = require('socket.io')(http);

let listOfEvents;

exports.createEvent = (req, res, next) => {
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
                location: req.body.location
            };

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
                        updateEvents();
                        return res.status(200).json({
                            message: "eventCreated"
                        });
                    });
                }
            });
            //socket.io
            io.sockets.on('connection', (socket) => {
                socket.on('new-event-created', (data) => {
                    io.sockets.emit('new-event', eventCreated);
                    console.log('new event emitted');
                });
            });
        });
};

exports.goEvent = (req, res, next) => {

    const eventId = req.body.event_id;
    const userId = req.body.user_id;
    let fail = false;

    eventModel.update({
        _id: eventId

    }, {
        $push: {
            participant: userId
        }
    }, (err, user) => {
        if (err) {
            fail = true;
            msg = 'falla en user';
        }
    });

    userModel.update({
        _id: userId
    }, {
        $push: {
            assistedEvents: eventId
        }
    }, (err, user) => {
        if (fail) {
            fail = true;
            msg = 'falla en user';
        }
    });
    if (fail) {
        return res.status(400).json({
            message: msg
        });
    } else {
        return res.status(200).json({
            message: 'update succesfully'
        });
    }
};



exports.finishEvent = (req, res) => {
    console.log('asdasd');
    console.log('params', req.params.id);
    eventModel.findByIdAndUpdate(req.params.id, {
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

exports.getEventById = (req, res, next) => {
    console.log('params', req.params);
    eventModel.find({
        _id: req.params.id
    }, (err, eventSelected) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json(eventSelected);
    });
};

exports.getEventByCreatorId = (req, res, next) => {
    eventModel.findOne({
        creator: req.params.id,
        status: true
    }, (err, eventSelected) => {
        if (err) {
            return res.status(500).json(err);
        }
        console.log('Event by id found', eventSelected);
        return res.status(200).json(eventSelected);
    });
};

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

// function leaveEvent(user, event){
//   eventModel.find
// }

//
// io.on('eventCreated', (socket) => {
//     io.send("updateSocketListOfEvents", clientListNames);
//});

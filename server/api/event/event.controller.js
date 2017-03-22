/*jshint esversion: 6*/
const eventModel = require('./event.model');
const mongoose = require('mongoose');
const userModel = require('../user/user.model');

let listOfEvents;

exports.createEvent = (req, res, next) => {
    userModel
        .findOne({
            _id: req.body.creator
        }).exec((err, user) => {
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
                        if (err) {
                            return next(err);

                        } else {
                            return res.status(200).json({
                                message: "eventCreated"
                            });
                        }
                    });
                }
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
        return res.status(200).json(events);
    });
};

exports.getEventById = (req, res, next) => {
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

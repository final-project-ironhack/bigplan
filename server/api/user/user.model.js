/*jshint esversion:6*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: false
    },
    description: {
        type: String,
        required: false
    },
    createdEvents: [{
        type: ObjectId,
        ref: 'Event'
    }],
    assistedEvents: [{
        type: ObjectId,
        ref: 'Event'
    }],
    rating: [{
        type: ObjectId,
        ref: 'RatingUser'
    }]
});

module.exports = mongoose.model('User', userSchema);

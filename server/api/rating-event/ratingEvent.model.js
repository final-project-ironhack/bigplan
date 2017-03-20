/*jshint esversion: 6*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const ratingEventSchema = new mongoose.Schema({
    eventOwner: {
        type: ObjectId,
        require: true
    },
    eventQuality: {
        type: Number,
        require: true
    },
    managment: {
        type: Number,
        require: true
    },
    average: {
        type: Number,
        require: true
    }
});

module.exports = mongoose.model('ratingEvent', ratingEventSchema);

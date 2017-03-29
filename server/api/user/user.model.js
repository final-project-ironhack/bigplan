/*jshint esversion:6*/
<<<<<<< HEAD
const mongoose = require( 'mongoose' );
=======
const mongoose = require('mongoose');
>>>>>>> fb20aaf134d1f580ccb231d36df67efc97209706
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
<<<<<<< HEAD
  email: { type: String, require: true },
  password: { type: String, require: true },
  username: { type: String, require: true },
  name: { type: String, require: true },
  description: { type: String, required: false },
  createdEvents : [{ type: ObjectId, ref: 'Event' }],
  assistedEvents: [{ type: ObjectId, ref: 'Event' }],
  rating: [{ type: ObjectId, ref:'RatingUser' }]
=======
    email: {
        type: String,
        require: false
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
        require: false
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
>>>>>>> fb20aaf134d1f580ccb231d36df67efc97209706
});

module.exports = mongoose.model('User', userSchema);

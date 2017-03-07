/*jshint esversion:6*/
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: false },
  description: { type: String, required: true },
  image: { type: String, required: false },
  state: { type: Boolean, required: true },
  rating: { type: ObjectId, ref: 'RatingEvent' },
  creator: { type: ObjectId, ref: 'User' },
  participant: [{ type: ObjectId, ref: 'User' }]
});


module.exports = mongoose.model('User', userSchema);

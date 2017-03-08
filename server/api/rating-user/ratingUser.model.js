 /*jshint esversion:6*/
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const ratingUserSchema = new mongoose.Schema ({
  userId: { type: ObjectId, require: true },
  punctual: { type: Number, require: true },
  responsable: { type: Number, require: true },
  funny: { type: Number, require: true },
  average: { type: Number, require: true }
});

module.exports = mongoose.model('ratingUser', ratingUserSchema);

<<<<<<< HEAD
/*jshint esversion:6*/
=======
 /*jshint esversion:6*/
>>>>>>> fb20aaf134d1f580ccb231d36df67efc97209706
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

<<<<<<< HEAD
const ratingUserSchema = new mongoose.Schema({
=======
const ratingUserSchema = new mongoose.Schema ({
>>>>>>> fb20aaf134d1f580ccb231d36df67efc97209706
  userId: { type: ObjectId, require: true },
  punctual: { type: Number, require: true },
  responsable: { type: Number, require: true },
  funny: { type: Number, require: true },
  average: { type: Number, require: true }
});

module.exports = mongoose.model('ratingUser', ratingUserSchema);

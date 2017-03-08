/*jshint esversion: 6*/
mongoose = require( 'mongoose' );
userModel = require( './user.model');

exports.createUser = (req, res, next) => {
  const newUser = new userModel({
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
    name: req.body.name,
    description: req.body.description
  });

  newUser.save((err, card) => {
    if(err){
      console.log(err);
      return res.send(500);
    }
  });
  res.json({
    message: 'user succesfully created',
    user: newUser
  });
};

exports.editUser = (req, res, next) => {
  const userId = req.params.id;

  userModel.findByIdAndUpdate(userId, {
    $set: req.body
  }, (err, user) => {
      if(err){
        return res.status(400).json({
          message: 'Unable to update user',
          error: err
        });
      }
      res.json({
        message: 'user succesfully updated',
        user: user
      });
  });

};

exports.getAllUsers = (req, res, next) => {
  userModel.find({}, (err, users) => {
    if(err){ return res.json(err);}
    return res.json( users );
  });
};
exports.removeUser = (req, res, next) => {
  console.log('Hola');
  console.log(req.params.id);
  userModel.findById(req.params.id, (err, user) => {
    console.log(err);
      if(err){
        res.json({
          message: 'impossible to remove user',
          error: err
        });
      }else{
        user.remove((err)=>{
          if (err) return next(err);
          res.json({
            message: 'user removed'
          });
        });
      }
    });
};

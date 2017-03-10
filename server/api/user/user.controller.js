/*jshint esversion: 6*/
const mongoose = require('mongoose');
const User = require('./user.model');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcrypt');
const bcryptSalt = 10;


/*exports.createUser = (req, res, next) => {
  const newUser = new User({
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
*/

exports.createUser = function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;
    const name = req.body.name;
    const description = req.body.description;

    if (!username || !password || !username || !name) {
        res.status(400).json({
            message: "Provide all fields"
        });
        return;
    }
    User.findOne({
        username
    }, "username", (err, user) => {
        if (user !== null) {
            res.status(400).json({
                message: "The username already exists"
            });
            return;
        }
        const salt = bcrypt.genSaltSync(bcryptSalt);
        const hashPass = bcrypt.hashSync(password, salt);
        const newUser = new User({
            password: hashPass,
            email: email,
            username: username,
            name: name,
            description: description,
        });
        newUser.save((err) => {
            if (err) {
                res.status(400).json({
                    message: "Something went wrong"
                });
            } else {
                req.login(newUser, function(err) {
                    if (err) {
                        return res.status(500).json({
                            message: 'something went wrong.'
                        });
                    }
                    console.log(req.user);
                    res.status(200).json(req.user);
                });
            }
        });
    });
};

exports.logUser = function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json(info);
        }
        req.login(user, function(err) {
            if (err) {
                console.log('holacaracola');
                return res.status(500).json({
                    message: 'something went wrong.'
                });
            }
            res.status(200).json(req.user);
        });
    })(req, res, next);
};
exports.logOutUser = function(req, res) {
    req.logout();
    res.status(200).json({
        message: 'Success'
    });
};
exports.authUser = function(req, res) {
    if (req.isAuthenticated()) {
        return res.status(200).json(req.user);
    }
    return res.status(403).json({
        message: 'Unauthorized'
    });
};

exports.editUser = (req, res, next) => {
    const userId = req.params.id;
    User.findByIdAndUpdate(userId, {
        $set: req.body
    }, (err, user) => {
        if (err) {
            return res.status(400).json({
                message: 'Unable to update user',
                error: err
            });
        }
        res.json({
            message: 'user succesfully updated',
            //user: user
        });
    });
};

exports.getAllUsers = (req, res, next) => {
    User.find({}, (err, users) => {
        if (err) {
            return res.json(err);
        }
        return res.json(users);
    });
};


exports.getUserById = (req, res, next) => {
  userModel.findOne({}, (err, user) => {
    if(err){
      return res.status(500).json({
        message: 'user not found',
        error: err
      });
    } else {
      return res.status(200).json(
        user
      );
    }
  });
};


exports.removeUser = (req, res, next) => {
    User.findById(req.params.id, (err, user) => {
        if (err) {
            res.json({
                message: 'impossible to remove user',
                error: err
            });
        } else {
            user.remove((err) => {
                if (err) return next(err);
                res.json({
                    message: 'user removed'
                });
            });
        }
    });
};

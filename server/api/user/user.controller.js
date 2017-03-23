/*jshint esversion: 6*/
const mongoose = require('mongoose');
const User = require('./user.model');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcrypt');
const bcryptSalt = 10;


exports.getUserLogged = function(req, res, next) {
    User
        .findOne({
            _id: req.session.currentUser._id
        }).exec((err, user) => {
            if (err) {
                return res.status(400).json(error);
            } else {
                return res.status(200).json(user);
            }
        });
};

exports.createUser = function(req, res, next) {
    const password = req.body.password;
    const username = req.body.username;


    if (!username || !password) {
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
            username: username,
        });
        newUser.save((err) => {
            if (err) {
                res.status(400).json({
                    error
                });
            } else {
                req.login(newUser, function(err) {
                    if (err) {
                        return res.status(400).json({
                            error
                        });
                    }
                    res.status(200).json(req.user);
                });
            }
        });
    });
};

exports.logInUser = function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(400).json(info);
        }

        req.login(user, function(err) {
            if (err) {
                return res.status(500).json({
                    error
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
exports.loggedIn = function(req, res) {
    if (req.isAuthenticated()) {
        return res.status(200).json(req.user);
    }
    return res.status(403).json({
        message: 'Unauthorized'
    });
};

exports.getPrivateData = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.status(200).json({
            message: 'You are authenticate'
        });
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
        res.status(200).json({
            message: 'user succesfully updated',
            //user: user
        });
    });
};

exports.getAllUsers = (req, res, next) => {
    User.find({}, (err, users) => {
        if (err) {
            return res.status(400).json(err);
        } else {
            return res.status(200).json(users);

        }
    });
};


exports.getUserById = (req, res, next) => {
    User.findOne({
        _id: req.params.id
    }, (err, user) => {
        if (err) {
            return res.status(400).json({
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
            res.status(400).json({
                message: 'impossible to remove user',
                error: err
            });
        } else {
            user.remove((err) => {
                if (err) {
                    return res.status(400).json(err);
                }
                res.status(200).json({
                    message: 'user removed'
                });
            });
        }
    });
};

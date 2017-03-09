/*jshint esversion:6*/
let express = require('express');
let controller = require('./rating-user.controller');

let router = express.Router();

router.post('create-rating-user', controller.createRatingUser);

module.exports = router;

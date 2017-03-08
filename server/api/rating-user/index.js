/*jshint esversion:6*/
let express = require('express');
let controller = require('./rating-user.controller');

let router = express.Router();

router.post('createRatingUser', controller.createRatingUser);

module.exports = router;

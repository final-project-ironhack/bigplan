/*jshint esversion:6*/
let express = require('express');
let controller = require('./rating-event.controller');

let router = express.Router();

router.post('/createRatingEvent', controller.createRatingEvent);

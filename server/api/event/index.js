/*jshint esversion:6*/
let express = require('express');
let controller = require('./rating-event.controller');

let router = express.Router();

router.post('/createEvent',controller.createEvent);
router.put('/editEvent/:id', controller.editEvent);
router.put('/finishEvent/:id', controller.finishEvent);
router.get('/getAllEvents', controller.getAllEvents);
router.delete('/removeEvent/:id', controller.removeEvent);

module.exports = router;

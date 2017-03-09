/*jshint esversion:6*/
let express = require('express');
let controller = require('./event.controller');

let router = express.Router();
//Woks but need checkout
router.post('/createEvent',controller.createEvent);
//Works!
router.put('/editEvent/:id', controller.editEvent);
//Works!
router.put('/finishEvent/:id', controller.finishEvent);
//toTest
router.get('/getAllEvents', controller.getAllEvents);
//toTest
router.delete('/removeEvent/:id', controller.removeEvent);

module.exports = router;

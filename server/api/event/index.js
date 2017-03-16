/*jshint esversion:6*/
let express = require('express');
let controller = require('./event.controller');

let router = express.Router();
//Woks but need checkout
router.post('/create-event',controller.createEvent);
//Works!
router.put('/edit-event/:id', controller.editEvent);
//Works!
router.put('/finish-event/:id', controller.finishEvent);
//Works!
router.get('/get-all-events', controller.getAllEvents);
//toTest
router.get('/get-event-by-id/:id', controller.getEventById);
//Works!
router.delete('/remove-event/:id', controller.removeEvent);

router.put('/go-event', controller.goEvent);

// router.put('/leave-event',controller.leaveEvent);

// router.get('/get-event-params', controller.getEventByParams);

//router.get('/get-event-params', controller.getEventByParams);

module.exports = router;

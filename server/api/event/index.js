/*jshint esversion:6*/
let controller = require('./event.controller');
let express = require('express');

let router = express.Router();

router.post('/create-event', controller.createEvent);
router.put('/finish-event/:id', controller.finishEvent);
router.put('/go-event', controller.goEvent);
router.get('/get-all-events', controller.getAllEvents);
router.get('/get-event-by-creator-id/:id', controller.getEventByCreatorId);
router.get('/get-event-by-id/:id', controller.getEventById);
router.delete('/remove-event/:id', controller.removeEvent);

module.exports = router;

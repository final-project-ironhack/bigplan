/*jshint esversion:6*/
let express = require('express');
let controller = require('./card.controller');

let router = express.Router();
router.get('/', controller.getAllEvents);
router.post('/', controller.createEvent);
router.put('/:id', controller.editEvent);
router.put('/:id/finishEvent', controller.finishEvent);
router.delete('/:id', controller.removeEvent);

module.exports = router;

/*jshint esversion:6*/
let express = require('express');
let controller = require('./card.controller');

let router = express.Router();

router.post('/', controller.createUser);
router.put('/:id', controller.editUser);
router.delete('/:id', controller.removeUser);

module.exports = router;

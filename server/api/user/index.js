/*jshint esversion:6*/
let express = require('express');
let controller = require('./user.controller');

let router = express.Router();

router.post('/createUser', controller.createUser);
couter.put('/editUser/:id', controller.editUser);
router.get('/getAllUsers', controller.getAllUsers);
router.delete('/removeUser/:id', controller.removeUser);

module.exports = router;

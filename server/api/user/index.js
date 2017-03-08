/*jshint esversion:6*/
let express = require('express');
let controller = require('./user.controller');

let router = express.Router();
//Works!
router.post('/createUser', controller.createUser);
//toTest
router.put('/editUser/:id', controller.editUser);
//Works
router.get('/getAllUsers', controller.getAllUsers);
//toTest
router.delete('/removeUser/:id', controller.removeUser);

module.exports = router;

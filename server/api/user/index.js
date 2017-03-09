/*jshint esversion:6*/
let express = require('express');
let controller = require('./user.controller');

let router = express.Router();
//Works!
router.post('/create-user', controller.createUser);
//Works!
router.put('/edit-user/:id', controller.editUser);
//Works
router.get('/get-all-users', controller.getAllUsers);
//Works!
router.get('/get-user-by-id/:id', controller.getUserById);
//Works!
router.delete('/remove-user/:id', controller.removeUser);

module.exports = router;

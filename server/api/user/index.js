/*jshint esversion:6*/
let express = require('express');
let controller = require('./user.controller');

let router = express.Router();
router.get('/get-all-users', controller.getAllUsers);
router.get('/get-user-by-id/:id', controller.getUserById);
router.get('/loggedin', controller.loggedIn);
router.get('/get-user-logged', controller.getUserLogged);
router.put('/edit-user/:id', controller.editUser);
router.post('/signup', controller.createUser);
router.post('/login', controller.logInUser);
router.post('/logout', controller.logOutUser);
router.post('/create-user', controller.createUser);
router.delete('/remove-user/:id', controller.removeUser);

module.exports = router;

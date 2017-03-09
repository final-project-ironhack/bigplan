/*jshint esversion:6*/
let express = require('express');
let controller = require('./user.controller');

let router = express.Router();

router.post('/signup', controller.createUser);
router.post('/login', controller.logUser);
router.post('/logout', controller.logOutUser);
router.post('/loggedin', controller.authUser);


//Works!
router.post('/create-user', controller.createUser);
//Works!
router.put('/edit-user/:id', controller.editUser);
//Works
router.get('/getAll-users', controller.getAllUsers);
//Works!
router.delete('/remove-user/:id', controller.removeUser);

module.exports = router;

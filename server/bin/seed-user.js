/*jshint esversion:6*/
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/big-plan');
const User = require('../api/user/user.model');

const users = [
  {
    email: 'julia@mail.com',
    password: 'password',
    username: 'jutler',
    name: 'julia',
    description: 'Pinta y colorea',
    img: 'img'
    // createdEvents: [],
    // assistedEvents: [],
    // rating: []
  },
  {
    email: 'segismundo@mail.com',
    password: 'password',
    username: 'segis',
    name: 'segismundo',
    description: 'Me gusta el campo y pasar tiempo al aire libre',
    img: 'img'
    // createdEvents: [],
    // assistedEvents: [],
    // rating: []
  },
  {
    email: 'borja@mail.com',
    password: 'password',
    username: 'borjaonrails',
    name: 'borja',
    description: 'Da boss',
    img: 'img'
    // createdEvents: [],
    // assistedEvents: [],
    // rating: []
  }
];
User.create(users, (err, docs) => {
  if (err) {
    throw err;
  }

  docs.forEach((user) => {
    console.log(user.name);
  });
  mongoose.connection.close();
});

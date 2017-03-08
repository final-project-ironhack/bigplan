/*jshint esversion:6*/
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/product-example-development');
const User = require('../api/user/user.model');

const users = [
  {
    email: 'julia@mail.com',
    password: 'password',
    username: 'jutler',
    name: 'julia',
    description: 'Pinta y colorea',
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
    // createdEvents: [],
    // assistedEvents: [],
    // rating: []
  }
];

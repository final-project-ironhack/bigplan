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
    location: { lat: -22.363, lng: 120.044 },
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
    location: { lat: -24.363, lng: 130.044 },
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
    location: { lat: -25.363, lng: 131.044 },
    // createdEvents: [],
    // assistedEvents: [],
    // rating: []
  }
];

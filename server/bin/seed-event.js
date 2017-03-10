/*jshint esversion:6*/
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/big-plan');
const Event = require('../api/event/event.model');

const events = [
  {
      name: 'Visita museo del prado',
      category: 'cultura',
      tags: ['#chachi'],
      description: 'Tengo ganas de pasear con alguien por el prado',
      image: 'imagen',
      status: true,
      rating: [],
      location: { lat: -22.363, lng: 120.044 },

      // creator:
      // participant: []
  },
  {
    name: 'Best plan ever',
    category: 'ocio',
    tags: ['#chachi','#piruli'],
    description: 'Tomar un cafe',
    image: 'imagen',
    status: true,
    rating: [],
    location: { lat: -24.363, lng: 130.044 },

    // creator:
    // participant: []
  },
];
Event.create(events, (err, docs) => {
  if (err) {
    throw err;
  }

  docs.forEach((event) => {
    console.log(event.name);
  });
  mongoose.connection.close();
});

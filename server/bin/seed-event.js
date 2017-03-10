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
      image: 'http://cdn3-www.cattime.com/assets/uploads/2011/08/best-kitten-names-1.jpg',
      status: true,
      rating: [],
      location: { lat: 40.41, lng: 3.70 },

      // creator:
      // participant: []
  },
  {
    name: 'Best plan ever',
    category: 'ocio',
    tags: ['#chachi','#piruli'],
    description: 'Tomar un cafe',
    image: 'http://dreamatico.com/data_images/kitten/kitten-3.jpg',
    status: true,
    rating: [],
    location: { lat: 60.363, lng: 5.044 },

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

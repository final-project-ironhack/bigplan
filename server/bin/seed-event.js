/*jshint esversion:6*/
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/big-plan');
const Event = require('../api/event/event.model');

const events = [
  {
      name: 'Ironbeers',
      category: 'clubbing',
      tags: ['#chachi'],
      description: 'Tengo ganas de pasear con alguien por el prado y lo que surja',
      image: 'http://cdn3-www.cattime.com/assets/uploads/2011/08/best-kitten-names-1.jpg',
      status: true,
      rating: [],
      location: { lat: 40.416749, lng: -3.283201 },

      // creator:
      // participant: []
  },

  {
      name: 'Goiko Grill',
      category: 'food',
      tags: ['#chachi'],
      description: 'Tengo ganas de pasear con alguien por el prado',
      image: 'http://cdn3-www.cattime.com/assets/uploads/2011/08/best-kitten-names-1.jpg',
      status: true,
      rating: [],
      location: { lat: 40.459749, lng: -3.186251 },

      // creator:
      // participant: []
  },

  {
      name: 'Concierto de James Rhodes',
      category: 'music',
      tags: ['#chachi'],
      description: 'Tengo ganas de pasear con alguien por el prado',
      image: 'http://cdn3-www.cattime.com/assets/uploads/2011/08/best-kitten-names-1.jpg',
      status: true,
      rating: [],
      location: { lat: 40.455749, lng: -3.686601 },

      // creator:
      // participant: []
  },

  {
      name: 'De compras por Fuencarral',
      category: 'shopping',
      tags: ['#chachi'],
      description: 'Tengo ganas de pasear con alguien por el prado',
      image: 'http://cdn3-www.cattime.com/assets/uploads/2011/08/best-kitten-names-1.jpg',
      status: true,
      rating: [],
      location: { lat: 40.449749, lng: -3.686401 },

      // creator:
      // participant: []
  },


  {
      name: 'Visita museo del prado',
      category: 'culture',
      tags: ['#chachi'],
      description: 'Tengo ganas de pasear con alguien por el prado',
      image: 'http://cdn3-www.cattime.com/assets/uploads/2011/08/best-kitten-names-1.jpg',
      status: true,
      rating: [],
      location: { lat: 40.429249, lng: -3.526201 },

      // creator:
      // participant: []
  },


  {
      name: 'Marathon',
      category: 'fitness',
      tags: ['#chachi'],
      description: 'Tengo ganas de pasear con alguien por el prado',
      image: 'http://cdn3-www.cattime.com/assets/uploads/2011/08/best-kitten-names-1.jpg',
      status: true,
      rating: [],
      location: { lat: 40.239749, lng: -3.626101 },

      // creator:
      // participant: []
  },

  {
    name: 'Best plan ever',
    category: 'hobbies',
    tags: ['#chachi','#piruli'],
    description: 'Tomar un cafe',
    image: 'http://dreamatico.com/data_images/kitten/kitten-3.jpg',
    status: true,
    rating: [],
    location: { lat: 40.839749, lng: -3.677201 },

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

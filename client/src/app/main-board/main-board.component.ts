import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from './../event.service';
import * as GoogleMapsLoader  from 'google-maps';
// import { InfoBubble } from 'js-info-bubble';

@Component({
  selector: 'app-main-board',
  templateUrl: './main-board.component.html',
  styleUrls: ['./main-board.component.css'],
  providers: [EventService]
})
export class MainBoardComponent implements OnInit {

  events: any
  eventLocation : Object

  constructor(
    private route: ActivatedRoute,
    private EventService: EventService
  ) {

  }

  ngOnInit() {
    let eventLocation
    this.EventService.getEventList()
      .subscribe((events) => {
        this.events = events;
        eventLocation = this.events[0].location
      });

    // const GoogleKey = .env;

    GoogleMapsLoader.load(function(google) {

      // Must be browser coordinates
      const location = { lat: -12.363, lng: 120.044 };
      // console.log(eventLocation)


      navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };




      const locations = [
      { lat: -12.363, lng: 120.044 },
      { lat: -18.363, lng: 160.044 }
    ]

      // console.log(locations);

      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: location,
        zoomControl: false,
        scaleControl: false,
        streetViewControl: false,
        mapTypeControl: false,
      });

      // infoWindow.setPosition(pos);
      // infoWindow.setContent('Location found.');
      map.setCenter(pos);

      const contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' + '<img src="https://ca.slack-edge.com/T02CQ4EN4-U3KPHFCUW-807f02da0a86-72">' +
        '<h2 id="event-name" class="event-name">Quedada para preguntar dudas de Java</h2>' +
        '<h5 id="user-name" class="user-name">JavaMaister2000</h5>' +
        '<div id="bodyContent">' +
        '<p>Lorem ipsum dolor sit amet, consectetur.</p>' +
        '</div>' +
        '</div>';

      const infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 200,
      });

      const image = {
        url: 'https://ca.slack-edge.com/T02CQ4EN4-U3KPHFCUW-807f02da0a86-72',
		        scaledSize: new google.maps.Size(35, 35)
      }


      for (var i = 0; i < locations.length; i++) {
        console.log(locations[i]);
       const marker = new google.maps.Marker({
          position: locations[i],
          map: map,
          animation: google.maps.Animation.DROP,
          icon: image
        });

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {
            // infowindow.setContent(locations[i]);
            infowindow.open(map, marker);
          }
        })(marker, i));
      }


    });

  });}
}

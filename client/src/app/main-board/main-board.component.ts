import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from './../event.service';
import * as GoogleMapsLoader  from 'google-maps';
import { SessionService } from '../session.service';


// import { InfoBubble } from 'js-info-bubble';

@Component({
  selector: 'app-main-board',
  templateUrl: './main-board.component.html',
  styleUrls: ['./main-board.component.css'],
  providers: [EventService]
})
export class MainBoardComponent implements OnInit {

  user: any;
  events: any;
  eventLocation: Object;
  error: string;


  constructor(
    private session: SessionService,
    private route: ActivatedRoute,
    private EventService: EventService
  ) {

  }

  ngOnInit() {

    this.session.isLoggedIn()
      .subscribe(
        (user) => this.successCb(user)
      );

    const eventS = this.EventService;
    GoogleMapsLoader.load(function(google) {

      // if available, fetches browser geolocalitzacion
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        // if not, fetches static geolocalitzacion
        //Puerta del Sol coords: 40.417160, -3.703539
        const location = { lat: -12.363, lng: 120.044 };


        //   const eventlocation = [
        //   { lat: -12.363, lng: 120.044 },
        //   { lat: -18.363, lng: 160.044 }
        // ]

        // console.log(locations);

        const map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: location,
          zoomControl: false,
          scaleControl: false,
          streetViewControl: false,
          mapTypeControl: false,
        });

        ///infoWindow.setPosition(pos);
        // infoWindow.setContent('Location found.');
        map.setCenter(pos);

        const image = {
          url: 'https://ca.slack-edge.com/T02CQ4EN4-U3KPHFCUW-807f02da0a86-72',
		        scaledSize: new google.maps.Size(35, 35)
        }

        eventS.getEventList()
          .subscribe((events) => {
            events.map((e) => {
              console.log(e);
              const marker = new google.maps.Marker({
                  position: e.location,
                  map: map,
                  animation: google.maps.Animation.DROP,
                  icon: image
                });

                const contentString =
                  '<div id="content">' +
                  '<div id="siteNotice">' +
                  '</div>' + '<img src="https://ca.slack-edge.com/T02CQ4EN4-U3KPHFCUW-807f02da0a86-72">' +
                  '<h2 id="event-name" class="event-name" style="color:red">'+ e.name + '</h2>' +
                  '<p>'+ e.description +'</p>' +
                  '<h5 id="user-name" class="user-name"> '+ e.creator +' </h5>' +
                  '</div>';

                const infowindow = new google.maps.InfoWindow({
                  content: contentString,
                  maxWidth: 200,
                });


              marker.addListener('click',
                  () => infowindow.open(map, marker));
            });
          });
      });
    });
  }

  successCb(user) {
    this.user = user;
    this.error = null;
  }
}

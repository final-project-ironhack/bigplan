import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from './../event.service';
declare function require(name: string);
var GoogleMapsLoader = require('google-maps');
import { SessionService } from '../session.service';
//socket.io
//import { FormControl } from '@angular/common';
import { UpdateEventsService } from '../update-events.service';

@Component({
  //moduleId: module.id,
  selector: 'app-main-board',
  templateUrl: './main-board.component.html',
  styleUrls: ['./main-board.component.css'],
  providers: [EventService, UpdateEventsService]
})
export class MainBoardComponent implements OnInit {
  uri: any;
  user: any;
  eventS: any;
  eventLocation: Object;
  error: string;
  infobubble: any;
  //socket.io
  connection: any;

  constructor(
    private session: SessionService,
    private route: ActivatedRoute,
    private EventService: EventService,
    //socket.io
    private UpdateEventsService: UpdateEventsService
  ) { }

  ngOnInit() {

    this.session.isLoggedIn()
      .subscribe(
      (user) => { console.log(user); this.successCb(user) }
      );
    const updateEvent = this.UpdateEventsService;
    const eventS = this.EventService;
    GoogleMapsLoader.KEY = 'AIzaSyBmHIjgfyzkhCKmCgMBGJgsr7Ad4rRuiAY';

    GoogleMapsLoader.load(function(google) {

      var styles = [
        {
          "featureType": "all",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#ffffff"
            }
          ]
        },
        {
          "featureType": "all",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "visibility": "on"
            },
            {
              "color": "#424b5b"
            },
            {
              "weight": 2
            },
            {
              "gamma": "1"
            }
          ]
        },
        {
          "featureType": "all",
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry",
          "stylers": [
            {
              "weight": 0.6
            },
            {
              "color": "#545b6b"
            },
            {
              "gamma": "0"
            }
          ]
        },
        {
          "featureType": "landscape",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#545b6b"
            },
            {
              "gamma": "1"
            },
            {
              "weight": "10"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#666c7b"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#545b6b"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#424a5b"
            },
            {
              "lightness": "0"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#666c7b"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#2e3546"
            }
          ]
        }
      ];
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
          zoom: 13,
          center: location,
          zoomControl: false,
          scaleControl: false,
          streetViewControl: false,
          mapTypeControl: false,
        });

        ///infoWindow.setPosition(pos);
        // infoWindow.setContent('Location found.');
        map.setCenter(pos);

        //socket.io
        /*this.connection = this.UpdateEventsService.updateEvent()
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
*/

        function goDoSomething(d) {
          console.log(d.getAttribute("data-event-id"));
        }

        $(".clickme").on("click",(e)=> console.log("heyyy"));

        eventS.getEventList()
          .subscribe((events) => {
            events.map((e) => {

              const image = {url: '../assets/img/' + e.category +'.png',}

              console.log(e);
              console.log(e.category);
              console.log(e._id);
              //console.log('USER||||||||||||||||||||||||||',this.user);



                let marker = new google.maps.Marker({
                position: e.location,
                map: map,
                animation: google.maps.Animation.DROP,
                icon: image,
                url: "home/" + '58c82793e7bbc466da9738a7/' + "event/" + e._id,
              });

               marker.setValues = ({type: "identificador", id: e._id});
               console.log('marker', marker)
              const contentString =

                '<div data-id-event=' + e._id + ' id="content">' +
                '<div id="siteNotice">' +
                //'<a [routerLink]=\"[\'/create-event\']\">HOLA</a>'+
                '</div>' + '<img src="https://ca.slack-edge.com/T02CQ4EN4-U3KPHFCUW-807f02da0a86-72">' +
                '<h2 id="event-name" class="event-name" style="color:red">' + e.name + '</h2>' +
                '<p>' + e.description + '</p>' +
                '<a routerLink="/log-in">holi</a>' +
                '<a class="clickme">CLICKME</a>' +
                '<h5 id="user-name" class="user-name"> ' + e.creator + ' </h5>' +
                '</div>';

              const infowindow = new google.maps.InfoWindow({
                content: contentString,
                maxWidth: 200,
              });

              map.setOptions({ styles: styles });
              marker.addListener('click',
                () => window.location.href = marker.url);
            });
          });
      });
    });
  }

  successCb(user) {
    console.log('USER:::::::::::::::::', user)
    this.user = user;
    this.error = null;
  }
}

import { NgModule, ChangeDetectorRef} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { SessionService } from '../session.service';
import { EventService } from './../event.service';
import { EventComponent } from '../event/event.component';
import { LoggedinService } from '../loggedin.service';

//socket.io
import * as io from 'socket.io-client';
const socketURL = 'http://localhost:8888';
//const serialport = require("serialport");
/* WEBSOCKET config using socket.io */
const socket = io.connect(socketURL);
/*const SerialPort = serialport.SerialPort; // localize object constructor
const sp = new SerialPort("/dev/tty-usbserial1", {
  parser: serialport.parsers.readline("\n"),
  baudrate: 57600
});*/


import { UpdateEventsService } from '../update-events.service';
declare function require(name: string);
var GoogleMapsLoader = require('google-maps');

@Component({
  //moduleId: module.id,
  selector: 'app-main-board',
  templateUrl: './main-board.component.html',
  styleUrls: ['./main-board.component.css'],
  providers: [EventService, UpdateEventsService],
})


export class MainBoardComponent implements OnInit {
  uri: any;
  user: any;
  eventS: any;
  eventLocation: Object;
  error: string;
  //socket.io
  connection: any;
  sse: any = 'Selecciona un evento';

  constructor(
    private session: SessionService,
    private route: ActivatedRoute,
    private loggedin: LoggedinService,
    private EventService: EventService,

    private router: Router,
    private cd: ChangeDetectorRef
  ) { }

  changeSelectedEvent(event) {
    console.log("Changing selected event");
    this.sse = event;
    console.log(this);
    this.cd.detectChanges();
  }

  ngOnInit() {
    this.session.isLoggedIn()
      .subscribe(
      (user) => { console.log(user); this.successCb(user) }
      );



    const eventS = this.EventService;
    GoogleMapsLoader.KEY = 'AIzaSyBmHIjgfyzkhCKmCgMBGJgsr7Ad4rRuiAY';
    var instance = this;

    // GoogleMapsLoader.load((google) => {
    //     console.log("READY");
    // });

    GoogleMapsLoader.load((google) => {
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
      // navigator.geolocation.getCurrentPosition(function(position) {
      //   var pos = {
      //     lat: position.coords.latitude,
      //     lng: position.coords.longitude
      //   };
      //   console.log(pos);

      const madrid = { lat: 40.438212, lng: -3.6813352000000004 };
      // map.setCenter(madrid);

      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: madrid,
        zoomControl: false,
        scaleControl: false,
        streetViewControl: false,
        mapTypeControl: false,
      });

      ///infoWindow.setPosition(pos);
      // infoWindow.setContent('Location found.');

      function goDoSomething(d) {
        console.log(d.getAttribute("data-event-id"));
      }

      socket.on('connect', function() {
        console.log('connected');
        socket.on('new-event', () => {
          console.log('ESTOY DENTRO')
          eventS.getEventList()
            .subscribe((events) => {
              events.map((e) => {

                if (!e.location) {
                  console.error("This event does not have location." + e._id);
                  return;
                }
                const image = { url: '../assets/img/' + e.category + '.png', }

                // console.log(e);
                // console.log(e.category);
                // console.log(e._id);
                //console.log('USER||||||||||||||||||||||||||',this.user);

                let marker = new google.maps.Marker({
                  position: e.location,
                  map: map,
                  animation: google.maps.Animation.DROP,
                  icon: image,
                  url: '#'
                });

                marker.setValues = ({ type: "identificador", id: e._id });
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
                  function() {
                    map.panTo(this.position);
                    console.log("YUHU CLICK");
                    instance.changeSelectedEvent(e);
                  });
              });
            });
        });
      });


      eventS.getEventList()
        .subscribe((events) => {
          events.map((e) => {

            if (!e.location) {
              console.error("This event does not have location." + e._id);
              return;
            }
            const image = { url: '../assets/img/' + e.category + '.png', }

            // console.log(e);
            // console.log(e.category);
            // console.log(e._id);
            //console.log('USER||||||||||||||||||||||||||',this.user);

            let marker = new google.maps.Marker({
              position: e.location,
              map: map,
              animation: google.maps.Animation.DROP,
              icon: image,
              url: '#'
            });

            marker.setValues = ({ type: "identificador", id: e._id });
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
              function() {
                map.panTo(this.position);
                console.log("YUHU CLICK");
                instance.changeSelectedEvent(e);
              });
          });
        });
    });
    // });
  }

  successCb(user) {
    console.log('USER:::::::::::::::::', user)
    this.user = user;
    this.error = null;
  }
}

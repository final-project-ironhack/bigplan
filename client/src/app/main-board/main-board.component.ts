import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EventComponent } from '../event/event.component';
import { EventService } from './../event.service';
import { LoggedinService } from '../loggedin.service';
import { NgModule, ChangeDetectorRef} from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { SessionService } from '../session.service';
import { UpdateEventsService } from '../update-events.service';

declare function require(name: string);

const GoogleMapsLoader = require('google-maps');

@Component({
  selector: 'app-main-board',
  templateUrl: './main-board.component.html',
  styleUrls: ['./main-board.component.css'],
  providers: [EventService, UpdateEventsService],
})
export class MainBoardComponent implements OnInit {
  error: string;
  eventS: any;
  eventLocation: Object;
  sse: any = 'Selecciona un evento';
  uri: any;
  user: any;

  constructor(
    private session: SessionService,
    private route: ActivatedRoute,
    private loggedin: LoggedinService,
    private EventService: EventService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) { }

  changeSelectedEvent(event) {
    this.sse = event;
    this.cd.detectChanges();
  }

  ngOnInit() {
    this.session.isLoggedIn()
      .subscribe(
      (user) => { this.successCb(user) }
      );

    const eventS = this.EventService;
    GoogleMapsLoader.KEY = 'AIzaSyBmHIjgfyzkhCKmCgMBGJgsr7Ad4rRuiAY';
    const instance = this;

    GoogleMapsLoader.load((google) => {
      const styles = [
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

      const madrid = { lat: 40.438212, lng: -3.6813352000000004 };

      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: madrid,
        zoomControl: false,
        scaleControl: false,
        streetViewControl: false,
        mapTypeControl: false,
      });

      function goDoSomething(d) {
        console.log(d.getAttribute("data-event-id"));
      }

      eventS.getEventList()
        .subscribe((events) => {
          events.map((e) => {

            if (!e.location) {
              return;
            }
            const image = { url: '../assets/img/' + e.category + '.png', }
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
  };

  successCb(user) {
    this.user = user;
    this.error = null;
  };
};

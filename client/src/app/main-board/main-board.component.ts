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

  event: any

  constructor(
    private route: ActivatedRoute,
    private EventService: EventService
  ) {

  }

  ngOnInit() {

    this.EventService.getEventList()
      .subscribe((event) => {
        this.event = event;
      });

    // const GoogleKey = .env;

    GoogleMapsLoader.load(function(google) {

      const location = { lat: -25.363, lng: 131.044 };

      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: location,
        zoomControl: false,
        scaleControl: false,
        streetViewControl: false
      });

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

      const marker = new google.maps.Marker({
        position: location,
        map: map,
        animation: google.maps.Animation.DROP,
        icon: image

      });

      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });


    });

  }
}

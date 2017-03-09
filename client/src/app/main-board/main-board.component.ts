import { Component, OnInit } from '@angular/core';
import * as GoogleMapsLoader  from 'google-maps';
// import { InfoBubble } from 'js-info-bubble';

@Component({
  selector: 'app-main-board',
  templateUrl: './main-board.component.html',
  styleUrls: ['./main-board.component.css']
})
export class MainBoardComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {

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

      // const InfoBubble = new InfoBubble({
      // map: map,
      // content: '<div class="mylabel">The label</div>',
      // shadowStyle: 1,
      // padding: 0,
      // backgroundColor: 'rgb(57,57,57)',
      // borderRadius: 5,
      // arrowSize: 10,
      // borderWidth: 1,
      // borderColor: '#2c2c2c',
      // disableAutoPan: true,
      // hideCloseButton: true,
      // arrowPosition: 30,
      // backgroundClassName: 'transparent',
      // arrowStyle:
      // });

      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });


    });

  }
}

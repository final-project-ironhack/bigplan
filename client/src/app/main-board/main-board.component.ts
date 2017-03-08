import { Component, OnInit } from '@angular/core';
import * as GoogleMapsLoader  from 'google-maps';


@Component({
  selector: 'app-main-board',
  templateUrl: './main-board.component.html',
  styleUrls: ['./main-board.component.css']
})
export class MainBoardComponent implements OnInit {


  constructor() {

  }


  ngOnInit() {
    GoogleMapsLoader.load(function(google) {

      var location = { lat: -25.363, lng: 131.044 };

      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: location,
        zoomControl: false,
        scaleControl: false,
        streetViewControl: false
      });

      var contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
        '<div id="bodyContent">' +
        '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
        'sandstone rock formation in the southern part of the ' +
        'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) ' +
        'south west of the nearest large town, Alice Springs; 450&#160;km ' +
        '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major ' +
        'features of the Uluru - Kata Tjuta National Park. Uluru is ' +
        'sacred to the Pitjantjatjara and Yankunytjatjara, the ' +
        'Aboriginal people of the area. It has many springs, waterholes, ' +
        'rock caves and ancient paintings. Uluru is listed as a World ' +
        'Heritage Site.</p>' +
        '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
        'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' +
        '(last visited June 22, 2009).</p>' +
        '</div>' +
        '</div>';

      var infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 200
      });

      var image = {
        url: 'https://ca.slack-edge.com/T02CQ4EN4-U3KPHFCUW-807f02da0a86-72',
		        scaledSize: new google.maps.Size(35, 35)
      }

      var marker = new google.maps.Marker({
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

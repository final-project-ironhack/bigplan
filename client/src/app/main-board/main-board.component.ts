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
      var uluru = {lat: -25.363, lng: 131.044};

      var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: uluru
      });

      var marker = new google.maps.Marker({
          position: uluru,
          map: map
      });
    });
  }
}

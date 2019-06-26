import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-small-weather-widget',
  templateUrl: './small-weather-widget.component.html',
  styleUrls: ['./small-weather-widget.component.scss']
})
export class SmallWeatherWidgetComponent implements OnInit {
  weather = {
    temp: '79',
    weatherType: 'Cloudy Skies',
    position: 'Sicklerville, New Jersey',
    date: {
      day: 21,
      month: 'May'
    },
    wind: '2 KM/H',
    rain: '33%',
    sun: '83 %'
  };
  constructor() {}

  ngOnInit() {}
}

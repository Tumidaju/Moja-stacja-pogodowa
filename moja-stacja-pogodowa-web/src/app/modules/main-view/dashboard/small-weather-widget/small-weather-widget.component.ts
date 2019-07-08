import { WeatherWidget } from './../../../../models/weather-widget.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-small-weather-widget',
  templateUrl: './small-weather-widget.component.html',
  styleUrls: ['./small-weather-widget.component.scss']
})
export class SmallWeatherWidgetComponent implements OnInit {
  @Input() widget: WeatherWidget;
  constructor() {}

  ngOnInit() {
    // console.log('123', this.widget);
  }
}

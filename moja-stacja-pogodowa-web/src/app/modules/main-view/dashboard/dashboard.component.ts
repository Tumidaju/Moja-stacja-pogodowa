import { WeatherWeatherBit } from './../../../models/city-weatherbit/weather-weatherbit.model';
import { WeatherAccuWeather } from './../../../models/city-accu-weather/weather-accu-weather.model';
import { WeatherOpenWeather } from './../../../models/city-open-weather/weather-open-weather.model';
import { WeatherWidget } from './../../../models/weather-widget.model';
import { ApiTypes } from 'src/app/enums/api.enum';
import { WidgetService } from './../settings/services/widget.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { SharedService } from '../../../services/shared.service';
import { Observable } from 'rxjs';
import { WidgetApi } from 'src/app/models/widget.model';
import { first } from 'rxjs/operators';
import { WeatherService } from '../settings/services/weather.service';
import { Duration } from 'src/app/enums/duration.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  userId: number;
  widgetArr: WeatherWidget[][] = [];

  constructor(
    private sharedService: SharedService,
    private widgetService: WidgetService,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('currentUser')).userID;
    this.showUserInfo();
    this.getWidgetList();
  }
  getWidgetList(): void {
    this.widgetService
      .getWidgetList(this.userId)
      .pipe(first())
      .subscribe(widgetArr => {
        // this.widgetArr = widgetArr;
        widgetArr.forEach(widget => {
          this.fetchWeatherDataBaseOnDuration(
            widget.Id,
            widget.Duration,
            widget.APIId
          );
        });
      });
  }
  fetchWeatherDataBaseOnDuration(
    widgetId: number,
    duration: string,
    apiId: number
  ) {
    this.weatherService
      .getWeather(widgetId, Number(duration))
      .pipe(first())
      .subscribe(data => {
        const widgetData =
          data && typeof data === 'string' ? JSON.parse(data) : data;
        console.log(widgetId, widgetData);
        this.setWeatherWidgetData(widgetData, apiId);
      });
  }
  setWeatherWidgetData(data: any, apiId: number) {
    let weatherWidget: WeatherWidget[];
    switch (apiId) {
      case ApiTypes.openWeather:
        weatherWidget = this.setOpenWeatherWidget(data as WeatherOpenWeather);
        break;
      case ApiTypes.accuWeather:
        this.setAccuWeatherWidget(data as WeatherAccuWeather);
        break;
      case ApiTypes.weatherBit:
        this.setWeatherBitWidget(data as WeatherWeatherBit);
        break;
    }
    this.widgetArr.push(weatherWidget);
  }

  setOpenWeatherWidget(data: WeatherOpenWeather) {
    const weatherWidgetArr: WeatherWidget[] = [];
    if (!data.weather) {
      return;
    }
    data.weather.forEach(weather => {
      const obj: WeatherWidget = {
        temp: data.main.temp,
        description: weather.description,
        city: data.name,
        wind: data.wind.speed,
        humidity: data.main.humidity,
        date: Date.now()
      };
      weatherWidgetArr.push(obj);
    });
    return weatherWidgetArr;
  }
  setAccuWeatherWidget(data: WeatherAccuWeather) {}
  setWeatherBitWidget(data: WeatherWeatherBit) {}
  showUserInfo(): void {
    this.sharedService.showUser(true);
  }
  showAdminMenu(): void {
    this.sharedService.showAdminMain(true);
  }
  ngOnDestroy(): void {}
}

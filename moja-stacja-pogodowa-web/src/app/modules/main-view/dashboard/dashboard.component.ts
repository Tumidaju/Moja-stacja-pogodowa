import { WeatherWeatherBit } from './../../../models/city-weatherbit/weather-weatherbit.model';
import {
  WeatherAccuWeather,
  DailyForecast
} from './../../../models/city-accu-weather/weather-accu-weather.model';
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

// tslint:disable: no-bitwise
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
            Number(widget.Duration),
            widget.APIId
          );
        });
      });
  }
  fetchWeatherDataBaseOnDuration(
    widgetId: number,
    duration: number,
    apiId: number
  ) {
    this.weatherService
      .getWeather(widgetId, duration)
      .pipe(first())
      .subscribe(data => {
        let widgetData =
          data && typeof data === 'string' ? JSON.parse(data) : data;
        widgetData =
          widgetData && typeof widgetData === 'string'
            ? JSON.parse(widgetData)
            : widgetData;

        console.log(widgetId, widgetData);
        this.setWeatherWidgetData(widgetData, apiId, duration);
      });
  }
  setWeatherWidgetData(data: any, apiId: number, duration: number) {
    let weatherWidget: WeatherWidget[];
    switch (apiId) {
      case ApiTypes.openWeather:
        weatherWidget = this.setOpenWeatherWidget(data as WeatherOpenWeather);
        break;
      case ApiTypes.accuWeather:
        weatherWidget = this.setAccuWeatherWidget(data as WeatherAccuWeather);
        break;
      case ApiTypes.weatherBit:
        weatherWidget = this.setWeatherBitWidget(
          data as WeatherWeatherBit,
          duration
        );
        break;
    }
    this.widgetArr.push(weatherWidget);
  }

  addDays(date: number, days: number) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  setOpenWeatherWidget(data: WeatherOpenWeather): WeatherWidget[] {
    const weatherWidgetArr: WeatherWidget[] = [];
    if (!data.weather) {
      return;
    }
    data.weather.forEach((weather, index) => {
      const date = this.addDays(Number(data.dt) * 1000, index);
      const obj: WeatherWidget = {
        temp: data.main.temp,
        description: weather.description,
        city: data.name,
        wind: data.wind.speed,
        humidity: data.main.humidity,
        date: {
          day: date.getDate(),
          month: date.getMonth()
        }
      };
      weatherWidgetArr.push(obj);
    });
    return weatherWidgetArr;
  }
  setAccuWeatherWidget(data: WeatherAccuWeather) {
    const weatherWidgetArr: WeatherWidget[] = [];
    if (!data.DailyForecasts) {
      return;
    }
    data.DailyForecasts.forEach(weather => {
      let cityName = weather.Link.split('/')[5];
      cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
      const minTemp = weather.Temperature.Minimum.Value;
      const maxTemp = weather.Temperature.Maximum.Value;
      const temp = minTemp + maxTemp / 2;

      const date = new Date(weather.Date);

      const obj: WeatherWidget = {
        temp,
        description: weather.Day.ShortPhrase,
        city: cityName,
        wind: weather.Day.Wind.Speed.Value,
        humidity: weather.Day.RainProbability,
        date: {
          day: date.getDate(),
          month: date.getMonth()
        }
      };
      weatherWidgetArr.push(obj);
    });
    return weatherWidgetArr;
  }
  setWeatherBitWidget(
    data: WeatherWeatherBit,
    duration: number
  ): WeatherWidget[] {
    const weatherWidgetArr: WeatherWidget[] = [];
    if (!data.data) {
      return;
    }

    data.data.forEach(weather => {
      const cityName =
        duration !== Duration.oneDay ? data.city_name : weather.city_name;
      const date = new Date(weather.ob_time);
      const obj: WeatherWidget = {
        temp: weather.temp,
        description: weather.weather.description,
        city: cityName,
        wind: weather.wind_gust_spd | weather.wind_spd,
        humidity: weather.rh,
        date: {
          day: date.getDate(),
          month: date.getMonth()
        }
      };
      weatherWidgetArr.push(obj);
    });
    return weatherWidgetArr;
  }
  showUserInfo(): void {
    this.sharedService.showUser(true);
  }
  showAdminMenu(): void {
    this.sharedService.showAdminMain(true);
  }
  ngOnDestroy(): void {}
}

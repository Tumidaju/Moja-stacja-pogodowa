import { WidgetApiModel, WidgetApi } from './../../../../models/widget.model';
import { Injectable } from '@angular/core';
import { AppConfig } from 'src/app/app.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiTypes } from 'src/app/enums/api.enum';
import { CityOpenWeather } from 'src/app/models/city-open-weather/city-open-weather.model';
import { CityAccuWeather } from 'src/app/models/city-accu-weather/city-accu-weather.model';
import { CityWeatherBit } from 'src/app/models/city-weatherbit/city-weatherbit.model';

@Injectable()
export class WidgetService {
  constructor(private http: HttpClient, private config: AppConfig) {}

  createWidget(widget: WidgetApiModel) {
    return this.http.post<WidgetApiModel>(
      this.config.apiUrlLong + 'widgets/createWidget',
      widget
    );
  }
  getWidgetList(userId: number): Observable<WidgetApi[]> {
    return this.http.post<WidgetApi[]>(
      this.config.apiUrlLong + 'widgets/getWidgets',
      { id: userId }
    );
  }
  deleteWidget(userId: number, widgetId: number): Observable<any> {
    return this.http.post<WidgetApi[]>(
      this.config.apiUrlLong + 'widgets/deleteWidget',
      { userId, id: widgetId }
    );
  }
  updateWidget(widget: WidgetApi) {
    return this.http.post<WidgetApi[]>(
      this.config.apiUrlLong + 'widgets/updateWidget',
      widget
    );
  }
  createWidgetModelForApi(widgetValue: any, userId: number): WidgetApiModel {
    let cityId: string;
    if (widgetValue.city) {
      switch (widgetValue.APIId) {
        case ApiTypes.openWeather:
          cityId = (widgetValue.city as CityOpenWeather).id.toString();
          break;
        case ApiTypes.accuWeather:
          cityId = (widgetValue.city as CityAccuWeather).Key.toString();
          break;
        case ApiTypes.weatherBit:
          cityId = (widgetValue.city as CityWeatherBit).id.toString();
          break;
      }
    }
    const widget: WidgetApiModel = {
      ...widgetValue,
      lat: widgetValue.geo.lat,
      long: widgetValue.geo.long,
      userId,
      cityId
    };
    return widget;
  }
}

import { CityOpenWeather } from './city-open-weather/city-open-weather.model';

export class Widget {
  APIId: number;
  name: string;
  lat: string;
  long: string;
  city: CityOpenWeather;
}

export class WidgetApi {
  id: number;
  userId: string;
  APIId: number;
  name: string;
  lat: string;
  long: string;
  cityId: number;
}
export class WidgetApiModel {
  userId: string;
  APIId: number;
  name: string;
  lat: string;
  long: string;
  cityId: string;
}

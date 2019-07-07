import { City } from 'src/app/models/city.type';
import { Cities } from './city.type';

export interface Widget {
  APIId: number;
  name: string;
  lat: string;
  long: string;
  city: City;
  duration: string;
}

export interface WidgetApi {
  Id: number;
  UserId: string;
  APIId: number;
  Name: string;
  Lat: string;
  Long: string;
  CityId: string;
  Duration: string;
}
export interface WidgetApiWithCity extends WidgetApi {
  cityName: string;
}
export interface WidgetApiModel {
  userId: string;
  APIId: number;
  name: string;
  lat: string;
  long: string;
  cityId: string;
  duration: string;
}

import { City } from 'src/app/models/city.type';
import { Cities } from './city.type';

export interface Widget {
  APIId: number;
  name: string;
  lat: string;
  long: string;
  city: City;
}

export interface WidgetApi {
  Id: number;
  UserId: string;
  APIId: number;
  Name: string;
  Lat: string;
  Long: string;
  CityId: number;
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
}

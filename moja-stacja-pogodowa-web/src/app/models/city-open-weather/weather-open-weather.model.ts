export interface WeatherOpenWeather {
  clouds: Clouds;
  coord: WeatherCoord;
  dt: string;
  dt_txt: any;
  main: Main;
  name: string;
  sys: Sys;
  weather: WeatherOpen[];
  wind: Wind;
}

export interface Clouds {
  clouds: number;
}
export interface WeatherCoord {
  lon: string;
  lat: string;
}
export interface Main {
  temp: number;
  pressure: number;
  humidity: number;
  temp_min: number;
  temp_max: number;
}
export interface Sys {
  country: string;
  sunrise: number;
  sunset: number;
}
export interface WeatherOpen {
  id: number;
  main: string;
  description: string;
}
export interface Wind {
  speed: number;
  deg: number;
}

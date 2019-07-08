export interface WeatherWeatherBit {
  count: string;
  city_name?: string;
  data: Data[];
}
export interface Data {
  city_name: string;
  state_code: string;
  country_code: string;
  timezone: string;
  lat: number;
  lon: number;
  ob_time: string;
  station: string;
  vis: number;
  rh: number;
  dewpt: number;
  wind_dir: number;
  wind_cdir: string;
  wind_cdir_full: string;
  wind_spd: number;
  wind_gust_spd: number;
  temp: number;
  app_temp: number;
  clouds: number;
  datetime: string;
  weather: WeatherBit;
}
export interface WeatherBit {
  icon: string;
  code: string;
  description: string;
}

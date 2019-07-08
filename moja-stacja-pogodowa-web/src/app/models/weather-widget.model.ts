export interface WeatherWidget {
  icon?: string;
  temp: number;
  description: string;
  city: string;
  country?: string;
  wind: any;
  humidity: number;
  date: WeatherDate;
}
export interface WeatherDate {
  day: number;
  month: number;
}

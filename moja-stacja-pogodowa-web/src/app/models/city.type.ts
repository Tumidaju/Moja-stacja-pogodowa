import { CityOpenWeather } from './city-open-weather/city-open-weather.model';
import { CityAccuWeather } from './city-accu-weather/city-accu-weather.model';
import { CityWeatherBit } from './city-weatherbit/city-weatherbit.model';

export type City = CityOpenWeather[] | CityAccuWeather[] | CityWeatherBit[];

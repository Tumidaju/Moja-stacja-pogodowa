import { WeekDay } from '@angular/common';

export interface WeatherAccuWeather {
  DailyForecasts: DailyForecast[];
  Headline: Headline;
}
export interface DailyForecast {
  Date: string;
  Day: Day;
  EpochDate: number;
  HoursOfSun: number;
  Link: string;
  MobileLink: string;
  Moon: Moon;
  Night: Night;
  RealFeelTemperature: Temperature;
  Sources: string[];
  Sun: Sun;
  Temperature: Temperature;
}
export interface Day {
  CloudCover: number;
  HasPrecipitation: true;
  HoursOfIce: number;
  HoursOfPrecipitation: number;
  HoursOfRain: number;
  HoursOfSnow: number;
  IceProbability: number;
  Icon: number;
  IconPhrase: string;
  LongPhrase: string;
  PrecipitationIntensity: string;
  PrecipitationProbability: number;
  PrecipitationType: string;
  RainProbability: number;
  ShortPhrase: string;
  SnowProbability: 0;
  ThunderstormProbability: number;
  Wind: WindAccu;
}
export interface WindAccu {
  Direction: Direction;
  Speed: Units;
}
export interface Direction {
  Degrees: number;
  English: string;
  Localized: string;
}
export interface Units {
  Unit: string;
  UnitType: number;
  Value: number;
}
export interface Moon {
  Age: number;
  EpochRise: number;
  EpochSet: number;
  Phase: string;
  Rise: string;
  Set: string;
}
export interface Night {
  CloudCover: number;
  HasPrecipitation: false;
  HoursOfIce: number;
  HoursOfPrecipitation: number;
  HoursOfRain: number;
  HoursOfSnow: number;
  IceProbability: number;
  Icon: number;
  IconPhrase: string;
  LongPhrase: string;
  PrecipitationIntensity: any;
  PrecipitationProbability: number;
  PrecipitationType: any;
  RainProbability: number;
  ShortPhrase: string;
  SnowProbability: number;
  ThunderstormProbability: number;
  Wind: WindAccu;
}
export interface Temperature {
  Maximum: Units;
  Minimum: Units;
}
export interface Sun {
  EpochRise: number;
  EpochSet: number;
  Rise: string;
  Set: string;
}
export interface Headline {
  EffectiveDate: string;
  EffectiveEpochDate: number;
  Severity: number;
  Text: string;
}

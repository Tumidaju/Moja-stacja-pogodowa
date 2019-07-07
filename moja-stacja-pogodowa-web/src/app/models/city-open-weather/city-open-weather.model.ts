import { Coord } from './coord.model';
import { Geoname } from './geoname.model';
import { Lang } from './lang.model';
import { Stat } from './stat.model';
import { Station } from './station.model';

export interface CityOpenWeather {
  id: number;
  coord: Coord;
  country: string;
  geoname: Geoname;
  langs: Lang[];
  name: string;
  stat: Stat;
  stations: Station[];
  zoom: number;
}

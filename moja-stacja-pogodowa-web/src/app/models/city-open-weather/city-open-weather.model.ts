import { Coord } from './coord.model';
import { Geoname } from './geoname.model';
import { Lang } from './lang.model';
import { Stat } from './stat.model';
import { Station } from './station.model';

export class CityOpenWeather {
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

// {
//   "id": 14256,
//   "coord": {
//       "lon": 48.570728,
//       "lat": 34.790878
//   },
//   "country": "IR",
//   "geoname": {
//       "cl": "P",
//       "code": "PPL",
//       "parent": 132142
//   },
//   "langs": [
//       {
//           "de": "Azad Shahr"
//       },
//       {
//           "fa": "آزادشهر"
//       }
//   ],
//   "name": "Azadshahr",
//   "stat": {
//       "level": 1,
//       "population": 514102
//   },
//   "stations": [
//       {
//           "id": 7030,
//           "dist": 9,
//           "kf": 1
//       }
//   ],
//   "zoom": 10
// },

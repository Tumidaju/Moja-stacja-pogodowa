import { AdministrativeArea } from './administrative-area.model';
import { Country } from './country.model';
import { GeoPosition } from './geoposition.model';
import { Region } from './region.model';
import { TimeZone } from './timezone.model';

export class CityAccuWeather {
  AdministrativeArea: AdministrativeArea;
  Country: Country;
  DataSets: DataSet[];
  EnglishName: string;
  GeoPosition: GeoPosition;
  IsAlias: boolean;
  Key: string;
  LocalizedName: string;
  PrimaryPostalCode: string;
  Rank: number;
  Region: Region;
  SupplementalAdminAreas: SupplementalAdminArea[];
  TimeZone: TimeZone;
  Type: string;
  Version: number;
}

export class DataSet {}
export class SupplementalAdminArea {}

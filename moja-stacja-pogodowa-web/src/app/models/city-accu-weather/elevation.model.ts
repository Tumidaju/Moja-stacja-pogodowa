export class Elevation {
  Imperial: ElevationModel;
  Metric: ElevationModel;
}
export class ElevationModel {
  Value: number;
  Unit: string;
  UnitType: number;
}

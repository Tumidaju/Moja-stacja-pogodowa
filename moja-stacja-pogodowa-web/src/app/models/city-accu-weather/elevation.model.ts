export interface Elevation {
  Imperial: ElevationModel;
  Metric: ElevationModel;
}
export interface ElevationModel {
  Value: number;
  Unit: string;
  UnitType: number;
}

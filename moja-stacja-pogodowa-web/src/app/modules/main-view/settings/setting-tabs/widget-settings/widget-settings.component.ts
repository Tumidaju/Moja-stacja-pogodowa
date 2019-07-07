import { Place } from '../../../../../enums/place.enum';
import { City } from './../../../../../models/city.type';
import { WidgetApiModel, Widget } from 'src/app/models/widget.model';
import { WidgetService } from './../../services/widget.service';
import { CityAccuWeather } from './../../../../../models/city-accu-weather/city-accu-weather.model';
import { ConfigService } from './../../services/config.service';
import {
  WidgetApi,
  WidgetApiWithCity
} from './../../../../../models/widget.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Cities } from 'src/app/models/city.type';
import { CityOpenWeather } from 'src/app/models/city-open-weather/city-open-weather.model';
import { CityWeatherBit } from 'src/app/models/city-weatherbit/city-weatherbit.model';
import { ApiTypes } from 'src/app/enums/api.enum';
import { Api } from 'src/app/models/api.model';
import { Observable, forkJoin } from 'rxjs';
import { MatDialogRef, MatDialog } from '@angular/material';
import { WidgetFormDialogComponent } from './components/widget-form-dialog/widget-form-dialog.component';

@Component({
  selector: 'app-widget-settings',
  templateUrl: './widget-settings.component.html',
  styleUrls: ['./widget-settings.component.scss']
})
export class WidgetSettingsComponent implements OnInit {
  apis: Api[];
  widgetForm: FormGroup;
  userId: number;
  openWeatherCities: CityOpenWeather[];
  accuWeatherCities: CityAccuWeather[];
  weatherBitCities: CityWeatherBit[];
  widgetArr: WidgetApi[] = [];
  loader = false;

  constructor(
    private fb: FormBuilder,
    private configService: ConfigService,
    private widgetService: WidgetService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.userId = JSON.parse(localStorage.getItem('currentUser')).userID;
    this.setWidgetForm();
    this.getAllData();
  }
  getAllData(): void {
    const widgetListObs = this.getWidgetList();
    const apiListObs = this.getApiList();
    // const getCityListsObs = this.getCityLists();
    forkJoin(widgetListObs, apiListObs)
      .pipe(first())
      .subscribe((data: [WidgetApi[], Api[]]) => {
        this.widgetArr = data[0];
        this.apis = data[1];
        this.getCityLists()
          .pipe(first())
          .subscribe((cityList: Cities[]) => {
            cityList.forEach(citiesData => {
              console.log(citiesData);
              this.checkCitiesDataType(citiesData);
            });
            this.setData();
          });
      });
  }
  getWidgetList(): Observable<WidgetApi[]> {
    return this.widgetService.getWidgetList(this.userId).pipe(first());
  }
  setWidgetForm() {
    this.widgetForm = this.fb.group({ widgets: this.fb.array([]) });
  }
  setData(): void {
    this.widgetArr.forEach(widget => {
      this.setWidgetGroup(widget);
    });
  }
  setWidgetGroup(widget: WidgetApi) {
    const widgetWithCityName = this.addCityNameToWidget(widget);
    const city = this.getCityByCityId(widget.APIId, Number(widget.CityId));
    const obj: any = {
      id: widgetWithCityName.Id,
      name: widgetWithCityName.Name,
      APIId: widgetWithCityName.APIId,
      place: widgetWithCityName.CityId ? Place.fromList : Place.geo,
      geo: this.fb.group({
        lat: widgetWithCityName.Lat,
        long: widgetWithCityName.Long
      }),
      duration: widgetWithCityName.Duration,
      city
    };
    const widgetGroup = this.fb.group(obj);
    (this.widgetForm.controls.widgets as FormArray).push(widgetGroup);
    widgetGroup.controls.name.setValidators(Validators.required);
  }
  addCityNameToWidget(widget: WidgetApi): WidgetApiWithCity {
    const newWidget: WidgetApiWithCity = {
      ...widget,
      cityName: ''
    };
    const city = this.getCityByCityId(widget.APIId, Number(widget.CityId));
    if (!city) {
      return widget as WidgetApiWithCity;
    }
    switch (widget.APIId) {
      case ApiTypes.openWeather:
        newWidget.cityName = (city as CityOpenWeather).name;
        break;
      case ApiTypes.accuWeather:
        newWidget.cityName = (city as CityAccuWeather).LocalizedName;
        break;
      case ApiTypes.weatherBit:
        newWidget.cityName = (city as CityWeatherBit).city_name;
        break;
    }
    return newWidget;
  }
  getCityByCityId(APIId: number, cityId: number) {
    let city: City;
    switch (APIId) {
      case ApiTypes.openWeather:
        city = this.openWeatherCities.find(
          openWeatherCity => openWeatherCity.id === cityId
        );
        break;
      case ApiTypes.accuWeather:
        city = this.accuWeatherCities.find(
          accuWeatherCity => Number(accuWeatherCity.Key) === cityId
        );
        break;
      case ApiTypes.weatherBit:
        city = this.weatherBitCities.find(
          weatherBitCity => weatherBitCity.id === cityId
        );
        break;
    }
    return city;
  }
  getApiList(): Observable<Api[]> {
    return this.configService.getWeatherApiTypes().pipe(first());
  }
  getCityLists(): Observable<Cities[]> {
    const cityObsArr: Observable<Cities>[] = [];
    this.apis.forEach(api => {
      cityObsArr.push(this.getCityList(api.Id));
    });
    return forkJoin(cityObsArr);
  }
  getCityList(apiId: number): Observable<Cities> {
    return this.configService.getCityList(apiId).pipe(first());
  }
  checkCitiesDataType(citiesData: Cities): void {
    if (this.isOpenWeatherCityData(citiesData)) {
      this.openWeatherCities = citiesData;
    } else if (this.isAccuWeatherCityData(citiesData)) {
      this.accuWeatherCities = citiesData;
    } else if (this.isWeatherBitCityData(citiesData)) {
      this.weatherBitCities = citiesData;
    }
  }

  isOpenWeatherCityData(citiesData: Cities): citiesData is CityOpenWeather[] {
    return (citiesData[0] as CityOpenWeather).coord !== undefined;
  }
  isAccuWeatherCityData(citiesData: Cities): citiesData is CityAccuWeather[] {
    return (citiesData[0] as CityAccuWeather).AdministrativeArea !== undefined;
  }
  isWeatherBitCityData(citiesData: Cities): citiesData is CityWeatherBit[] {
    return (citiesData[0] as CityWeatherBit).city_name !== undefined;
  }
  openWidgetDialog(): void {
    const dialogRef: MatDialogRef<WidgetFormDialogComponent> = this.dialog.open(
      WidgetFormDialogComponent,
      {
        disableClose: true,
        data: {
          apis: this.apis,
          userId: this.userId,
          openWeatherCities: this.openWeatherCities,
          accuWeatherCities: this.accuWeatherCities,
          weatherBitCities: this.weatherBitCities
        }
      }
    );
    dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe(data => {
        if (!data) {
          return;
        }
        this.getWidgetList()
          .pipe(first())
          .subscribe(list => {
            this.widgetArr = list;
            const lastWidget = this.widgetArr[this.widgetArr.length - 1];
            this.setWidgetGroup(lastWidget);
          });
      });
  }
  deleteWidget(widget: FormGroup) {
    this.widgetService
      .deleteWidget(this.userId, widget.value.id)
      .pipe(first())
      .subscribe(() => {
        const widgets = this.widgetForm.controls.widgets as FormArray;
        const index = widgets.controls.findIndex(
          x => x.value.id === widget.value.id
        );
        widgets.removeAt(index);
      });
  }
  onSubmit(): void {
    if (!this.widgetForm.valid) {
    } else {
      console.log(this.widgetForm.value);
      // const widget: Widget = {
      //   ...this.widgetForm.value
      // };
      // const apiWeatherKeys: WeatherApiKeys = {
      //   ...this.widgetForm.value,
      //   userId: this.weatherApiKeys.UserId
      // };
      // this.updateWeatherApiKeys.emit(apiWeatherKeys);
    }
  }
}

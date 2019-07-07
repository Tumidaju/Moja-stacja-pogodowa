import { CityAccuWeather } from './../../../../../models/city-accu-weather/city-accu-weather.model';
import { Api } from 'src/app/models/api.model';
import { ConfigService } from './../../services/config.service';
import { WidgetApi } from './../../../../../models/widget.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { first } from 'rxjs/operators';
import { City } from 'src/app/models/city.type';
import { CityOpenWeather } from 'src/app/models/city-open-weather/city-open-weather.model';
import { CityWeatherBit } from 'src/app/models/city-weatherbit/city-weatherbit.model';

@Component({
  selector: 'app-widget-settings',
  templateUrl: './widget-settings.component.html',
  styleUrls: ['./widget-settings.component.scss']
})
export class WidgetSettingsComponent implements OnInit {
  apis: Api[];
  widgetForm: FormGroup;
  openWeatherCities: CityOpenWeather[];
  accuWeatherCities: CityAccuWeather[];
  weatherBitCities: CityWeatherBit[];

  widgetArr: WidgetApi[] = [
    {
      id: 1,
      APIId: 2,
      name: 'Mój widget',
      cityId: 14256,
      lat: '34.790878',
      long: '48.570728',
      userId: '67c345b9-5e79-42f2-bd24-324577e28a9e'
    },
    {
      id: 2,
      APIId: 2,
      name: 'Mój widget 2',
      cityId: 14256,
      lat: '34.790878',
      long: '48.570728',
      userId: '67c345b9-5e79-42f2-bd24-324577e28a9e'
    }
  ];

  constructor(private fb: FormBuilder, private configService: ConfigService) {}

  ngOnInit() {
    this.setWidgetForm();
    this.setData();
    this.getApiList();
  }
  setWidgetForm() {
    this.widgetForm = this.fb.group({ widgets: this.fb.array([]) });
  }
  setData(): void {
    this.widgetArr.forEach(widget => {
      const widgetGroup = this.fb.group(widget);
      (this.widgetForm.controls.widgets as FormArray).push(widgetGroup);
      widgetGroup.controls.name.setValidators(Validators.required);
    });
  }
  getApiList(): void {
    this.configService
      .getWeatherApiTypes()
      .pipe(first())
      .subscribe((data: Api[]) => {
        this.apis = data;
        this.getCityLists();
      });
  }
  getCityLists(): void {
    this.apis.forEach(api => {
      this.getCityList(api.Id);
    });
  }
  getCityList(apiId: number): void {
    this.configService
      .getCityList(apiId)
      .pipe(first())
      .subscribe((citiesData: City) => {
        console.log(apiId, citiesData);
        this.checkCitiesDataType(citiesData);
      });
  }
  checkCitiesDataType(citiesData: City): void {
    if (this.isOpenWeatherCityData(citiesData)) {
      this.openWeatherCities = citiesData;
    } else if (this.isAccuWeatherCityData(citiesData)) {
      this.accuWeatherCities = citiesData;
    } else if (this.isWeatherBitCityData(citiesData)) {
      this.weatherBitCities = citiesData;
    }
  }

  isOpenWeatherCityData(citiesData: City): citiesData is CityOpenWeather[] {
    return (citiesData[0] as CityOpenWeather).coord !== undefined;
  }
  isAccuWeatherCityData(citiesData: City): citiesData is CityAccuWeather[] {
    return (citiesData[0] as CityAccuWeather).AdministrativeArea !== undefined;
  }
  isWeatherBitCityData(citiesData: City): citiesData is CityWeatherBit[] {
    return (citiesData[0] as CityWeatherBit).city_name !== undefined;
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

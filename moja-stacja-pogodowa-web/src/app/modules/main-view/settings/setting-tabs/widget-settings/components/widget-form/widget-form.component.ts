import { ApiTypes } from '../../../../../../../enums/api.enum';
import { Cities, City } from 'src/app/models/city.type';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Optional,
  Inject
} from '@angular/core';
import {
  FormGroup,
  AbstractControl,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';
import {
  MAT_DIALOG_DATA,
  MatAutocompleteSelectedEvent
} from '@angular/material';
import { Place } from 'src/app/enums/place.enum';
import { Api } from 'src/app/models/api.model';
import { Observable } from 'rxjs';
import { startWith, map, filter, tap } from 'rxjs/operators';
import { CityOpenWeather } from 'src/app/models/city-open-weather/city-open-weather.model';
import { CityAccuWeather } from 'src/app/models/city-accu-weather/city-accu-weather.model';
import { CityWeatherBit } from 'src/app/models/city-weatherbit/city-weatherbit.model';
import { Duration } from 'src/app/enums/duration.enum';

@Component({
  selector: 'app-widget-form',
  templateUrl: './widget-form.component.html',
  styleUrls: ['./widget-form.component.scss']
})
export class WidgetFormComponent implements OnInit {
  place = Place;
  apiTypes = ApiTypes;
  duration = Duration;

  cityControl: FormControl = new FormControl();
  filteredOptions: Observable<Cities>;
  namePattern = /^([a-zA-ZąęćłóśźżĄĘĆŁÓŚŹŻ\\']){0,}$/;

  @Input() form: FormGroup;
  @Input() loader: boolean;
  @Input() new = false;
  @Input() apis: Api[];
  @Input() openWeatherCities: CityOpenWeather[];
  @Input() accuWeatherCities: CityAccuWeather[];
  @Input() weatherBitCities: CityWeatherBit[];

  @Output() submit = new EventEmitter<FormGroup>();

  constructor() {}

  ngOnInit() {
    console.log(this.form);
    this.cityControl.setValue(this.form.value.city);
    this.filteredOptions = this.cityControl.valueChanges.pipe(
      startWith(''),
      map(name => this._filter(name as string))
    );
    this.form.controls.APIId.valueChanges.subscribe(() => {
      this.form.controls.city.setValue(undefined);
      this.cityControl.setValue(undefined);
    });
    this.form.controls.place.valueChanges.subscribe(data => {
      this.setPlaceValidators(data);
    });
    if (this.new) {
      this.setPlaceValidators(this.form.value.APIId);
    }
  }
  resetOptions(value: any): Cities[] | string {
    return value ? value : [];
  }
  setPlaceValidators(data: number) {
    const controls = this.form.controls;
    switch (data) {
      case Place.fromList:
        controls.city.setValidators(Validators.required);
        (controls.geo as FormGroup).controls.lat.reset();
        (controls.geo as FormGroup).controls.long.reset();
        break;
      case Place.geo:
        (controls.geo as FormGroup).controls.lat.setValidators(
          Validators.required
        );
        (controls.geo as FormGroup).controls.long.setValidators(
          Validators.required
        );
        controls.city.reset();
        break;
    }
  }
  // displayOpen(city?: CityOpenWeather): string | undefined {
  //   return city ? city.name : undefined;
  // }
  // displayAccu(city?: CityAccuWeather): string | undefined {
  //   return city ? city.LocalizedName : undefined;
  // }
  // displayBit(city?: CityWeatherBit): string | undefined {
  //   return city ? city.city_name : undefined;
  // }

  // tslint:disable: semicolon
  displayFn = (city?: City): string | undefined => {
    switch (this.form.value.APIId) {
      case ApiTypes.openWeather:
        return city ? (city as CityOpenWeather).name : undefined;
      case ApiTypes.accuWeather:
        return city ? (city as CityAccuWeather).LocalizedName : undefined;
      case ApiTypes.weatherBit:
        return city ? (city as CityWeatherBit).city_name : undefined;
    }
  };
  // setValues() {
  //   this.name.setValue(this.data.name);
  //   this.surname.setValue(this.data.surname);
  //   this.email.setValue(this.data.email);
  //   this.course.setValue(this.data.course);
  //   this.typeOfStudy.setValue(this.data.typeOfStudy);
  //   this.dateOfCompletion.setValue(this.data.dateOfCompletion);
  // }
  compareSelectValues(
    selectedValue: string,
    compareValue: number | string
  ): boolean {
    if (!compareValue) {
      return undefined;
    }
    return Number(selectedValue) === Number(compareValue);
  }

  private _filter(value: string): Cities {
    if (!value || (value && value.length <= 2)) {
      return [];
    }
    if (typeof value === 'string') {
      const filterValue = value.toLowerCase();

      switch (this.form.value.APIId) {
        case ApiTypes.openWeather:
          return this.openWeatherCities.filter(option =>
            option.name.toLowerCase().includes(filterValue)
          );

        case ApiTypes.accuWeather:
          return this.accuWeatherCities.filter(option =>
            option.LocalizedName.toLowerCase().includes(filterValue)
          );

        case ApiTypes.weatherBit:
          return this.weatherBitCities.filter(option =>
            option.city_name.toLowerCase().includes(filterValue)
          );
        default:
          return [];
      }
    }
  }
  onCityOptionSelected(e: MatAutocompleteSelectedEvent): void {
    this.form.controls.city.setValue(e.option.value);
  }
}

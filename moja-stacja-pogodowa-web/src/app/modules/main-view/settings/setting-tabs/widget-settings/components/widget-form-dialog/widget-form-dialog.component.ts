import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CityAccuWeather } from './../../../../../../../models/city-accu-weather/city-accu-weather.model';
import { CityWeatherBit } from './../../../../../../../models/city-weatherbit/city-weatherbit.model';
import { ApiTypes } from '../../../../../../../enums/api.enum';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Api } from 'src/app/models/api.model';
import { WidgetService } from '../../../../services/widget.service';
import { first } from 'rxjs/operators';
import { Widget, WidgetApiModel } from 'src/app/models/widget.model';
import { CityOpenWeather } from 'src/app/models/city-open-weather/city-open-weather.model';
import { Place } from 'src/app/enums/place.enum';
import { Duration } from 'src/app/enums/duration.enum';

@Component({
  selector: 'app-widget-form-dialog',
  templateUrl: './widget-form-dialog.component.html',
  styleUrls: ['./widget-form-dialog.component.scss']
})
export class WidgetFormDialogComponent implements OnInit {
  dialogForm: FormGroup;
  loader = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<WidgetFormDialogComponent>,
    private widgetService: WidgetService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.setForm();
    // console.log(this.data);
  }
  setForm() {
    this.dialogForm = this.fb.group({
      name: ['', Validators.required],
      APIId: ['', Validators.required],
      place: Place.fromList,
      city: undefined,
      geo: this.fb.group({ lat: undefined, long: undefined }),
      duration: Duration.oneDay
    });
  }
  onSubmit(): void {
    if (this.dialogForm.invalid) {
      return;
    }
    const value = this.dialogForm.getRawValue();
    let cityId: number | string;
    console.log(this.dialogForm);
    switch (value.APIId) {
      case ApiTypes.openWeather:
        cityId = (value.city as CityOpenWeather).id;
        break;
      case ApiTypes.accuWeather:
        cityId = (value.city as CityAccuWeather).Key;
        break;
      case ApiTypes.weatherBit:
        cityId = (value.city as CityWeatherBit).id;
        break;
    }
    this.loader = true;
    const widget: WidgetApiModel = {
      ...value,
      userId: this.data.userId,
      cityId: cityId.toString()
    };
    this.widgetService
      .createWidget(widget)
      .pipe(first())
      .subscribe(() => {
        this.loader = false;
        this.dialogRef.close(value);
      });
  }
}

import { WeatherApiKeys } from 'src/app/models/weather-api-keys.model';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-widget-settings',
  templateUrl: './widget-settings.component.html',
  styleUrls: ['./widget-settings.component.scss']
})
export class WidgetSettingsComponent implements OnInit {
  // tslint:disable-next-line: variable-name
  private _weatherApiKeys: WeatherApiKeys;
  widgetForm: FormGroup;

  @Input() set weatherApiKeys(weatherApiKeys: WeatherApiKeys) {
    if (weatherApiKeys) {
      if (!this.widgetForm) {
        this.setWidgetForm();
      }
      this._weatherApiKeys = weatherApiKeys;
      const apiKeyGroup = (this.widgetForm.controls.apiKeys as FormGroup)
        .controls;
      apiKeyGroup.OWMKey.setValue(weatherApiKeys.OWMKey);
      apiKeyGroup.AWKey.setValue(weatherApiKeys.AWKey);
      apiKeyGroup.WBKey.setValue(weatherApiKeys.WBKey);
    }
  }
  get weatherApiKeys(): WeatherApiKeys {
    return this._weatherApiKeys;
  }
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.setWidgetForm();
  }
  setWidgetForm() {
    this.widgetForm = this.fb.group({
      apiKeys: this.fb.group({
        OWMKey: '',
        AWKey: '',
        WBKey: ''
      })
    });
  }
  onSubmit(): void {
    if (!this.widgetForm.valid) {
    } else {
    }
  }
}

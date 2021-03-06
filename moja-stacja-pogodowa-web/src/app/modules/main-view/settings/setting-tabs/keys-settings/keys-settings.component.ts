import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WeatherApiKeys } from 'src/app/models/weather-api-keys.model';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-keys-settings',
  templateUrl: './keys-settings.component.html',
  styleUrls: ['./keys-settings.component.scss']
})
export class KeysSettingsComponent implements OnInit {
  // tslint:disable-next-line: variable-name
  private _weatherApiKeys: WeatherApiKeys;
  apiKeysForm: FormGroup;

  @Input() set weatherApiKeys(weatherApiKeys: WeatherApiKeys) {
    if (weatherApiKeys) {
      if (!this.apiKeysForm) {
        this.setWidgetForm();
      }
      this._weatherApiKeys = weatherApiKeys;
      const apiKeyGroup = (this.apiKeysForm.controls.apiKeys as FormGroup)
        .controls;
      apiKeyGroup.OWMKey.setValue(weatherApiKeys.OWMKey);
      apiKeyGroup.AWKey.setValue(weatherApiKeys.AWKey);
      apiKeyGroup.WBKey.setValue(weatherApiKeys.WBKey);
    }
  }
  get weatherApiKeys(): WeatherApiKeys {
    return this._weatherApiKeys;
  }

  @Output() updateWeatherApiKeys = new EventEmitter<WeatherApiKeys>();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.setWidgetForm();
  }
  setWidgetForm() {
    this.apiKeysForm = this.fb.group({
      apiKeys: this.fb.group({
        OWMKey: '',
        AWKey: '',
        WBKey: ''
      })
    });
  }
  onSubmit(): void {
    if (!this.apiKeysForm.valid) {
    } else {
      const values = this.apiKeysForm.value;
      const apiWeatherKeys: WeatherApiKeys = {
        OWMKey: values.apiKeys.OWMKey,
        AWKey: values.apiKeys.AWKey,
        WBKey: values.apiKeys.WBKey,
        UserId: this.weatherApiKeys.UserId
      };
      this.updateWeatherApiKeys.emit(apiWeatherKeys);
    }
  }
}

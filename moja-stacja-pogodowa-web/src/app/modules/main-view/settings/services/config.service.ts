import { WeatherApiKeys } from 'src/app/models/weather-api-keys.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/app/app.config';

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient, private config: AppConfig) {}
  getWeatherApiKeys(userId: number): Observable<WeatherApiKeys> {
    return this.http.post<WeatherApiKeys>(
      this.config.apiUrl + 'config/getconfig',
      {
        id: '67c345b9-5e79-42f2-bd24-324577e28a9e'
      }
    );
  }
}

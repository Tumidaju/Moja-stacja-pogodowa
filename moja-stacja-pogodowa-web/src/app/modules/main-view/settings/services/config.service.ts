import { WeatherApiKeys } from 'src/app/models/weather-api-keys.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/app/app.config';
import { Api } from 'src/app/models/api.model';

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient, private config: AppConfig) {}
  getWeatherApiKeys(userId: number): Observable<WeatherApiKeys> {
    return this.http.post<WeatherApiKeys>(
      this.config.apiUrlLong + 'config/getconfig',
      {
        id: '67c345b9-5e79-42f2-bd24-324577e28a9e'
      }
    );
  }
  setWeatherApiKeys(
    weatherApiKeys: WeatherApiKeys
  ): Observable<WeatherApiKeys> {
    return this.http.post<WeatherApiKeys>(
      this.config.apiUrlLong + 'config/setconfig',
      weatherApiKeys
    );
  }
  getWeatherApiTypes(): Observable<Api[]> {
    return this.http.post<any>(
      this.config.apiUrlLong + 'widgets/getAPIList',
      null
    );
  }
  getCityList(apiId: number): Observable<any> {
    return this.http.post<number>(
      this.config.apiUrlLong + 'widgets/getCityList',
      apiId
    );
  }
}

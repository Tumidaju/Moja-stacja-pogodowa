import { Injectable } from '@angular/core';
import { AppConfig } from 'src/app/app.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs-compat/Observable';
import { Duration } from 'src/app/enums/duration.enum';

@Injectable()
export class WeatherService {
  constructor(private http: HttpClient, private config: AppConfig) {}

  getWeather(widgetId: number, duration: number): Observable<any> {
    let str: string;
    switch (duration) {
      case Duration.oneDay:
        str = 'FToday';
        break;
      case Duration.twoDays:
        str = 'F2Days';
        break;
      case Duration.fiveDays:
        str = 'F5Days';
        break;
    }
    return this.http.post(this.config.apiUrlLong + 'Weather/' + str, {
      widgetId
    });
  }
}

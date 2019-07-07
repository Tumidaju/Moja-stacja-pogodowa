import { WidgetService } from './../settings/services/widget.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { SharedService } from '../../../services/shared.service';
import { Observable } from 'rxjs';
import { WidgetApi } from 'src/app/models/widget.model';
import { first } from 'rxjs/operators';
import { WeatherService } from '../settings/services/weather.service';
import { Duration } from 'src/app/enums/duration.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  userId: number;
  widgetArr: WidgetApi[] = [];
  constructor(
    private sharedService: SharedService,
    private widgetService: WidgetService,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('currentUser')).userID;
    this.showUserInfo();
    this.getWidgetList();
  }
  getWidgetList(): void {
    this.widgetService
      .getWidgetList(this.userId)
      .pipe(first())
      .subscribe(widgetArr => {
        // this.widgetArr = widgetArr;
        widgetArr.forEach(widget => {
          this.fetchWeatherDataBaseOnDuration(
            widget.Id,
            widget.Duration,
            widget.APIId
          );
        });
      });
  }
  fetchWeatherDataBaseOnDuration(
    widgetId: number,
    duration: string,
    apiId: number
  ) {
    this.weatherService
      .getWeather(widgetId, Number(duration))
      .pipe(first())
      .subscribe(data => {

        console.log(widgetId, JSON.parse(data));
      });
  }
  showUserInfo(): void {
    this.sharedService.showUser(true);
  }
  showAdminMenu(): void {
    this.sharedService.showAdminMain(true);
  }
  ngOnDestroy(): void {}
}

import { CelsiusSignModule } from './../../../shared/celsius-sign/celsius-sign.module';
import { SmallWeatherWidgetModule } from './small-weather-widget/small-weather-widget.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatSidenavModule,
  MatTabsModule,
  MatIconModule
} from '@angular/material';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing';
import { LargeWeatherWidgetModule } from './large-weather-widget/large-weather-widget.module';
import { DayOfTheWeekModule } from 'src/app/shared/day-of-the-week/day-of-the-week.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatSidenavModule,
    SmallWeatherWidgetModule,
    LargeWeatherWidgetModule,
    MatTabsModule,
    MatIconModule,
    CelsiusSignModule,
    DayOfTheWeekModule
  ],
  declarations: [DashboardComponent],
  exports: [DashboardComponent]
})
export class DashboardModule {}

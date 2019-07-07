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

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatSidenavModule,
    SmallWeatherWidgetModule,
    LargeWeatherWidgetModule,
    MatTabsModule,
    MatIconModule
  ],
  declarations: [DashboardComponent],
  exports: [DashboardComponent]
})
export class DashboardModule {}

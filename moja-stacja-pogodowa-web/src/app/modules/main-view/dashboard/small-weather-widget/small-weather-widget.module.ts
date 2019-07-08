import { KmhModule } from './../../../../shared/kmh/kmh.module';
import { CelsiusSignModule } from './../../../../shared/celsius-sign/celsius-sign.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmallWeatherWidgetComponent } from './small-weather-widget.component';
import { MatCardModule } from '@angular/material';
import { MonthViewModule } from 'src/app/shared/month-view/month-view.module';

@NgModule({
  declarations: [SmallWeatherWidgetComponent],
  imports: [
    CommonModule,
    MatCardModule,
    CelsiusSignModule,
    MonthViewModule,
    KmhModule
  ],
  exports: [SmallWeatherWidgetComponent]
})
export class SmallWeatherWidgetModule {}

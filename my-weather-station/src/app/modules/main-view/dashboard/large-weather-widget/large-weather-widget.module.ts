import { CelsiusSignModule } from './../../../../shared/celsius-sign/celsius-sign.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LargeWeatherWidgetComponent } from './large-weather-widget.component';
import { MatTabsModule, MatIconModule } from '@angular/material';

@NgModule({
  declarations: [LargeWeatherWidgetComponent],
  imports: [CommonModule, MatTabsModule, MatIconModule, CelsiusSignModule],
  exports: [LargeWeatherWidgetComponent]
})
export class LargeWeatherWidgetModule {}

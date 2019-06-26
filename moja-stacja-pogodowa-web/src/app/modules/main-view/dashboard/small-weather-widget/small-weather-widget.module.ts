import { CelsiusSignModule } from './../../../../shared/celsius-sign/celsius-sign.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmallWeatherWidgetComponent } from './small-weather-widget.component';
import { MatCardModule } from '@angular/material';

@NgModule({
  declarations: [SmallWeatherWidgetComponent],
  imports: [CommonModule, MatCardModule, CelsiusSignModule],
  exports: [SmallWeatherWidgetComponent]
})
export class SmallWeatherWidgetModule {}

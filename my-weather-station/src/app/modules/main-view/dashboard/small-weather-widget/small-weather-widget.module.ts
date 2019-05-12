import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmallWeatherWidgetComponent } from './small-weather-widget.component';
import { MatCardModule } from '@angular/material';
import { CelsiusSignPipe } from './celcius-sign.pipe';

@NgModule({
  declarations: [SmallWeatherWidgetComponent, CelsiusSignPipe],
  imports: [CommonModule, MatCardModule],
  exports: [SmallWeatherWidgetComponent]
})
export class SmallWeatherWidgetModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayOfTheWeekPipe } from './day-of-the-week.pipe';

@NgModule({
  declarations: [DayOfTheWeekPipe],
  imports: [CommonModule],
  exports: [DayOfTheWeekPipe]
})
export class DayOfTheWeekModule {}

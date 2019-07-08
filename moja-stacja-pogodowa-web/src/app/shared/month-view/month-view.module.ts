import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthViewPipe } from './month-view.pipe';

@NgModule({
  declarations: [MonthViewPipe],
  imports: [CommonModule],
  exports: [MonthViewPipe]
})
export class MonthViewModule {}

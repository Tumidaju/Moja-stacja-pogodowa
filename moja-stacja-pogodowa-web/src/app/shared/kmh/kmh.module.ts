import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KmhPipe } from './kmh.pipe';

@NgModule({
  declarations: [KmhPipe],
  imports: [CommonModule],
  exports: [KmhPipe]
})
export class KmhModule {}

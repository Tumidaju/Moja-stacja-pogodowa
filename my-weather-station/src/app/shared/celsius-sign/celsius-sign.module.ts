import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CelsiusSignPipe } from './celsius-sign.pipe';

@NgModule({
  declarations: [CelsiusSignPipe],
  imports: [CommonModule],
  exports: [CelsiusSignPipe]
})
export class CelsiusSignModule {}

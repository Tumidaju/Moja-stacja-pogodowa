import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionComponent } from './accordion.component';
import { MatExpansionModule, MatFormFieldModule } from '@angular/material';

@NgModule({
  declarations: [AccordionComponent, MatFormFieldModule],
  imports: [MatExpansionModule, CommonModule]
})
export class AccordionModule {}

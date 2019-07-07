import { FormGroup } from '@angular/forms';
import { Component, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {
  @Input() accordionGroup: FormGroup;
  @Input() accordionTitles: string[];
  // @Output()
  constructor() {}

  ngOnInit() {}
  onClick() {}
}

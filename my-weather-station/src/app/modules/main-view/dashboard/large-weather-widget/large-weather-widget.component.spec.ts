import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LargeWeatherWidgetComponent } from './large-weather-widget.component';

describe('LargeWeatherWidgetComponent', () => {
  let component: LargeWeatherWidgetComponent;
  let fixture: ComponentFixture<LargeWeatherWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LargeWeatherWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LargeWeatherWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

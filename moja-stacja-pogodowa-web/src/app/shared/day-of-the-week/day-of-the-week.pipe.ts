import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayOfTheWeek'
})
export class DayOfTheWeekPipe implements PipeTransform {
  transform(value: number, args?: any): any {
    let transformedValue: string;
    switch (value) {
      case 0:
        transformedValue = 'Ndz';
        break;
      case 1:
        transformedValue = 'Pon';
        break;
      case 2:
        transformedValue = 'Wt';
        break;
      case 3:
        transformedValue = 'Śr';
        break;
      case 4:
        transformedValue = 'Czw';
        break;
      case 5:
        transformedValue = 'Pt';
        break;
      case 6:
        transformedValue = 'Sob';
        break;
    }
    return transformedValue;
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthView'
})
export class MonthViewPipe implements PipeTransform {
  transform(value: number, args?: any): any {
    let transformedValue: string;
    switch (value) {
      case 0:
        transformedValue = 'Styczeń';
        break;
      case 1:
        transformedValue = 'Luty';
        break;
      case 2:
        transformedValue = 'Marzec';
        break;
      case 3:
        transformedValue = 'Kwiecień';
        break;
      case 4:
        transformedValue = 'Maj';
        break;
      case 5:
        transformedValue = 'Czerwiec';
        break;
      case 6:
        transformedValue = 'Lipiec';
        break;
      case 7:
        transformedValue = 'Sierpień';
        break;
      case 8:
        transformedValue = 'Wrzesień';
        break;
      case 9:
        transformedValue = 'Październik';
        break;
      case 10:
        transformedValue = 'Listopad';
        break;
      case 11:
        transformedValue = 'Grudzień';
        break;
    }
    return transformedValue;
  }
}

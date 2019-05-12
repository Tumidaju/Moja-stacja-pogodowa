import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'celsiusSign'
})
export class CelsiusSignPipe implements PipeTransform {
  celsiusSign = '°C';
  transform(value: any): any {
    const transformedValue = value + this.celsiusSign;
    return transformedValue;
  }
}

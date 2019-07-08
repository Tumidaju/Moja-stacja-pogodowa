import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kmh'
})
export class KmhPipe implements PipeTransform {
  sign = 'km/h';
  transform(value: number): any {
    const transformedValue = value.toFixed(1) + this.sign;
    return transformedValue;
  }
}

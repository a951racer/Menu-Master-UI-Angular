import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'utcDatePipe'
})
export class UtcDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}

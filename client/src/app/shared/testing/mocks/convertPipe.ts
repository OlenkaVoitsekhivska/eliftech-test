import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'convert' })
export class MockConvertPipe implements PipeTransform {
  transform(value: string | number | null, currency: string): number | 0 {
    return typeof value === 'number' ? value : +value!;
  }
}

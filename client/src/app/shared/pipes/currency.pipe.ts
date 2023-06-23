import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convert',
})
export class CurrencyPipe implements PipeTransform {
  transform(value: string | number | null, currency: string): number | 0 {
    if (!value) {
      return 0;
    }
    let updValue = typeof value === 'string' ? +value : value;
    if (currency === 'UAH') {
      const rate = this.getCurrencyRate();
      return updValue * rate;
    }
    return updValue;
  }

  getCurrencyRate() {
    return JSON.parse(sessionStorage.getItem('dollarRate')!);
  }
}

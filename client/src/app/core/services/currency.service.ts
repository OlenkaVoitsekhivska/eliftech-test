import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private URL = environment.privatAPI;

  constructor(private http: HttpClient) {
    if (!sessionStorage.getItem('dollarRate')) {
      this.getCurrencyRate();
    }
  }

  getCurrencyRate() {
    this.http
      .get(this.URL)
      .subscribe((res: any) =>
        sessionStorage.setItem('dollarRate', res[1].buy)
      );
  }
}

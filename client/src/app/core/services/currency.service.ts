import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay, tap } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private URL = environment.privatAPI;

  constructor(private http: HttpClient) {
    if (!sessionStorage.getItem('dollarRate')) {
      this.getCurrencyRate().subscribe();
    }
  }

  getCurrencyRate() {
    return this.http.get(this.URL).pipe(
      shareReplay(1),
      tap((res: any) => sessionStorage.setItem('dollarRate', res[1].buy))
    );
  }
}

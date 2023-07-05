import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable, map } from 'rxjs';

import { AppState } from 'src/app/store/models/appState';
import { cartSelector } from 'src/app/store/cart/selectors';
import { TranslateService } from '@ngx-translate/core';
import { CurrencyService } from './core/services/currency.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  language!: string;

  itemsInCartNumber$: Observable<number> = this.store
    .select(cartSelector)
    .pipe(
      map(({ user, items }) =>
        items.reduce((acc: any, item: { qnt: any }) => acc + item.qnt, 0)
      )
    );

  constructor(
    private store: Store<AppState>,
    private translateService: TranslateService,
    private currencyService: CurrencyService
  ) {
    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('language') || 'en');
  }

  selectLanguage(lang: string) {
    localStorage.setItem('language', lang);
    this.translateService.use(localStorage.getItem('language') || 'en');
  }
}

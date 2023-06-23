import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable, map } from 'rxjs';

import { AppState } from 'src/app/store/models/appState';
import { cartSelector } from 'src/app/store/cart/selectors';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  language!: string;

  itemsInCartNumber$: Observable<number> = this.store
    .select(cartSelector)
    .pipe(
      map(({ items }) =>
        items.reduce((acc: any, item: { qnt: any }) => acc + item.qnt, 0)
      )
    );

  constructor(
    private store: Store<AppState>,
    private translateService: TranslateService
  ) {
    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('language') || 'en');
  }

  ngOnInit() {
    this.language = localStorage.getItem('language') || 'en';
  }

  selectLanguage(lang: string) {
    localStorage.setItem('language', lang);
    this.translateService.use(localStorage.getItem('language') || 'en');
  }
}

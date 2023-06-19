import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable, map } from 'rxjs';

import { AppState } from 'src/app/store/models/appState';
import { cartSelector } from 'src/app/store/cart/selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  itemsInCartNumber$: Observable<number> = this.store
    .select(cartSelector)
    .pipe(
      map(({ items }) =>
        items.reduce((acc: any, item: { qnt: any }) => acc + item.qnt, 0)
      )
    );

  constructor(private store: Store<AppState>) {}
}

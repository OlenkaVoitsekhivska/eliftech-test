import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable, combineLatest, map } from 'rxjs';

//MODELS
import { MenuItem } from 'src/app/models/menu-item';
import { AppState } from 'src/app/store/models/appState';

//STORE
import * as shopActions from 'src/app/store/shops/actions';
import * as cartActions from 'src/app/store/cart/actions';
import { shopsSelector } from 'src/app/store/shops/selectors';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss'],
})
export class ShopsComponent implements OnInit {
  public itemsForDisplay$!: Observable<any>;

  private shops$ = this.store.select(shopsSelector);

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.store.dispatch(shopActions.getShops());
    this.selectItemsForDisplay();
  }

  public handleClick(prod: MenuItem) {
    this.store.dispatch(cartActions.addItem({ item: prod }));
  }

  private selectItemsForDisplay() {
    this.itemsForDisplay$ = combineLatest([
      this.activatedRoute.params,
      this.shops$,
    ]).pipe(
      map(([params, shops]) => {
        const shopId = params['id'];

        if (!shopId) {
          return shops
            .map(({ menu }) => menu)
            .reduce((acc, menu) => acc.concat(menu), []);
        }
        return shops.find((shop) => shop._id === shopId)?.menu;
      })
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';
import { MenuItem } from '../models/menu-item';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store/shops/reducers';
import * as shopActions from './../../app/store/shops/actions';
import * as cartActions from './../../app/store/cart/actions';
import { shopsSelector } from '../store/shops/selectors';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss'],
})
export class ShopsComponent implements OnInit {
  shops$ = this.store.select(shopsSelector);

  itemsForDisplay$!: Observable<any>;

  shopId = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.store.dispatch(shopActions.getShops());
    this.selectItemsForDisplay();
  }

  handleClick(prod: MenuItem) {
    // this.store.dispatch(cartActions.addItem({ item: prod }));
    this.store.dispatch(cartActions.addItem({ item: prod }));
  }

  private selectItemsForDisplay() {
    this.itemsForDisplay$ = combineLatest([
      this.activatedRoute.params,
      this.shops$,
    ]).pipe(
      map(([params, shops]) => {
        const shopId = params['id'];
        this.shopId = shopId;
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

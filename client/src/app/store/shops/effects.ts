import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import { map, switchMap } from 'rxjs';

import { ShopsService } from 'src/app/core/services/shops.service';
import * as shopActions from 'src/app/store/shops/actions';

@Injectable()
export class ShopEffects {
  constructor(
    private actions$: Actions, // this is an RxJS stream of all actions
    private shopService: ShopsService // we will need this service for API calls
  ) {}

  loadShops$ = createEffect(() =>
    this.actions$.pipe(
      ofType(shopActions.getShops),
      switchMap(() =>
        this.shopService
          .getRestaurants()
          .pipe(map((shops) => shopActions.getShopsSuccess({ shops })))
      )
    )
  );
}

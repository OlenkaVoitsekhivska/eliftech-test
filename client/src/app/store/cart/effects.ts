import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as cartActions from './actions';
import { map, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShopsService } from 'src/app/core/services/shops.service';
import { MenuItem } from 'src/app/models/menu-item';
import { User } from '../models/user';

@Injectable()
export class CartEffects {
  constructor(
    private actions$: Actions,
    private shopsService: ShopsService // private snackBar: MatSnackBar
  ) {}

  placeOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cartActions.placeOrder),
      switchMap((order: { user: User; items: MenuItem[] }) =>
        this.shopsService.postOrder(order).pipe(
          map((result) =>
            cartActions.placeOrderSuccess({
              success: Boolean(result.succes),
              order: result.order,
            })
          )
        )
      )
    )
  );

  clearCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cartActions.placeOrderSuccess),
      map(() => cartActions.clearCart())
    )
  );
}

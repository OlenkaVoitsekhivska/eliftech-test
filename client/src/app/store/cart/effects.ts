import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as cartActions from './actions';
import { map, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShopsService } from 'src/app/core/services/shops.service';

@Injectable()
export class CartEffects {
  constructor(
    private actions$: Actions,
    private shopsService: ShopsService,
    private snackBar: MatSnackBar
  ) {}

  placeOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cartActions.placeOrder),
      switchMap((order: any) =>
        this.shopsService.postOrder(order).pipe(
          map((result) =>
            cartActions.placeOrderSuccess({
              success: Boolean(result.succes),
              order: result.order,
            })
          ),
          tap(() => {
            this.snackBar.open('Order successfully placed!', 'Close', {
              duration: 500, // Duration in milliseconds
              panelClass: ['success-snackbar'], // CSS class for custom styling
              verticalPosition: 'top',
            });
          })
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

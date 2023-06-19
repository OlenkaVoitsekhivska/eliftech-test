import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

//RXJS
import { map } from 'rxjs';

//MODELS
import { MenuItem } from 'src/app/models/menu-item';
import { AppState } from 'src/app/store/models/appState';

//STORE IMPORTS
import { cartSelector } from 'src/app/store/cart/selectors';
import * as cartActions from 'src/app/store/cart/actions';

@Component({
  selector: 'app-cart-contents',
  templateUrl: './cart-contents.component.html',
  styleUrls: ['./cart-contents.component.scss'],
})
export class CartContentsComponent {
  public cartData$ = this.store
    .select(cartSelector)
    .pipe(map((cart) => cart.items));

  constructor(private store: Store<AppState>) {}

  public handleClick(item: MenuItem) {
    this.store.dispatch(cartActions.deleteItem({ item }));
  }

  public handleInput(prod: MenuItem, input: string) {
    const trimmedInput = +input.trim();
    if (trimmedInput > 0) {
      this.store.dispatch(
        cartActions.editQntItem({ item: prod, qnt: trimmedInput })
      );
    }
  }
}

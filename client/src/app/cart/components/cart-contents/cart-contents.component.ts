import { Component, Input, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CartService } from 'src/app/core/services/cart.service';
import { MenuItem } from 'src/app/models/menu-item';
import { SubmitService } from '../../services/submit.service';
import { AppState } from 'src/app/store/shops/reducers';
import { Store } from '@ngrx/store';
import { cartSelector } from 'src/app/store/cart/selectors';
import * as cartActions from '../../../../app/store/cart/actions';
// interface ProdData {
//   image: string;
//   title: string;
//   price: number;
// }

@Component({
  selector: 'app-cart-contents',
  templateUrl: './cart-contents.component.html',
  styleUrls: ['./cart-contents.component.scss'],
})
export class CartContentsComponent implements OnInit {
  cartData$ = this.store.select(cartSelector).pipe(map((cart) => cart.items));

  constructor(
    private cartS: CartService,
    private submitS: SubmitService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    // this.cartData$ = this.cartS.cart$;
    // this.cartData$.subscribe((data) => this.submitS.updateListData(data));
  }

  handleClick(item: MenuItem) {
    this.store.dispatch(cartActions.deleteItem({ item }));
  }
  handleInput(prod: MenuItem, input: string) {
    const trimmedInput = +input.trim();
    if (trimmedInput > 0) {
      this.store.dispatch(
        cartActions.editQntItem({ item: prod, qnt: trimmedInput })
      );
    }
  }
}

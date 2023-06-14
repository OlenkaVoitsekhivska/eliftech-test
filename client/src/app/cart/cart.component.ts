import { Component, OnInit } from '@angular/core';
import { CartService } from '../core/services/cart.service';
import { MenuItem } from '../models/menu-item';
import { Observable, map } from 'rxjs';
import { SubmitService } from './services/submit.service';
import { AppState } from '../store/shops/reducers';
import { Store } from '@ngrx/store';
import { cartSelector } from '../store/cart/selectors';

interface ProdData {
  image: string;
  title: string;
  price: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  isDisabled: boolean = true;

  price$ = this.store
    .select(cartSelector)
    .pipe(
      map((cart) =>
        cart.items.reduce((acc, item) => acc + Number(item.price) * item.qnt, 0)
      )
    );

  constructor(
    private cartS: CartService,
    private submitS: SubmitService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {}
  handleSubmit(label: string) {
    console.log(label);
    this.submitS.updateClicks(true);
  }
}

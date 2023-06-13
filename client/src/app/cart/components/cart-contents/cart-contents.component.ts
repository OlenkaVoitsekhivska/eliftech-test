import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/core/services/cart.service';
import { MenuItem } from 'src/app/models/menu-item';
import { SubmitService } from '../../services/submit.service';
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
  cartData$!: Observable<MenuItem[]>;

  constructor(private cartS: CartService, private submitS: SubmitService) {}

  ngOnInit() {
    this.cartData$ = this.cartS.cart$;
    this.cartData$.subscribe((data) => this.submitS.updateListData(data));
  }

  handleClick(event: string, prod: MenuItem) {
    if (event === 'delete') {
      this.cartS.deleteItem(prod);
    }
  }
  handleInput(prod: MenuItem, input: string) {
    const trimmedInput = input.trim();
    if (trimmedInput.length && Number(trimmedInput) > 0) {
      this.cartS.updateQnt(prod, trimmedInput);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { CartService } from '../core/services/cart.service';
import { MenuItem } from '../models/menu-item';
import { Observable } from 'rxjs';
import { SubmitService } from './services/submit.service';

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
  cartData: ProdData[] = [
    {
      image: 'https://example.com/item1.jpg',
      title: 'Organic Apples',
      price: 2.99,
    },
    {
      image: 'https://example.com/item2.jpg',
      title: 'Grass-Fed Beef',
      price: 12.99,
    },
  ];

  isDisabled: boolean = true;

  cart: MenuItem[] = [];

  price$!: Observable<number>;

  constructor(private cartS: CartService, private submitS: SubmitService) {}

  ngOnInit() {
    this.getPrice();
    this.cart = this.cartS.getItems();
    this.price$ = this.cartS.price$;
  }
  getPrice() {
    this.cartS.calculatePrice();
  }

  handleSubmit(label: string) {
    console.log(label);
    this.submitS.updateClicks(true);
  }
}

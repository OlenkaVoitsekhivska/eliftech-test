import { Component, OnInit } from '@angular/core';
import { ShopsService } from '../core/services/shops.service';
import { Observable, map, switchMap, tap } from 'rxjs';
import { Restaurant } from '../models/restaurant';
import { MenuItem } from '../models/menu-item';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../core/services/cart.service';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss'],
})
export class ShopsComponent implements OnInit {
  menuItems: MenuItem[] = [];

  shops$!: Observable<Restaurant[]>;

  shopId: string = '';

  items$!: Observable<MenuItem[]>;

  singleMenu$!: Observable<Restaurant>;

  constructor(
    private s: ShopsService,
    private activatedRoute: ActivatedRoute,
    private cartS: CartService
  ) {}

  ngOnInit() {
    this.s.getRestaurants();
    this.shops$ = this.s.restaurants$;
    this.singleMenu$ = this.s.menu;
    // this.shopId = this.route.snapshot.paramMap.get('id')!;

    this.activatedRoute.params
      .pipe(
        tap((data) => {
          this.shopId = data['id'];
          console.log('this is pipe', data['id']);
        }),
        map((params) => this.s.getMenuByPlace(params['id']))
      )
      .subscribe();
  }
  getMenuItems(shops: Restaurant[]): MenuItem[] {
    return this.s.getAllMenuItems(shops);
  }

  handleClick(event: Event, prod: MenuItem) {
    console.log('Caught click', event, prod);

    this.cartS.addItem(prod);
  }
}

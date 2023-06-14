import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Restaurant } from 'src/app/models/restaurant';
import { MenuItem } from 'src/app/models/menu-item';

@Injectable({
  providedIn: 'root',
})
export class ShopsService {
  restaurants = new BehaviorSubject<Restaurant[]>([]);
  restaurants$ = this.restaurants.asObservable();

  menu = new BehaviorSubject<Restaurant>({ _id: '', name: '', menu: [] });
  menu$ = this.menu.asObservable();

  constructor(private http: HttpClient) {}

  URL = 'http://localhost:3000/api';

  // getRestaurants(): void {
  //   const url = `${this.URL}/restaurants`;
  //   this.http
  //     .get<Restaurant[]>(url)
  //     .subscribe((data) => this.restaurants.next(data));
  // }
  getRestaurants(): Observable<Restaurant[]> {
    const url = `${this.URL}/restaurants`;
    return this.http.get<Restaurant[]>(url);
  }

  getAllMenuItems(shops: Restaurant[]): MenuItem[] {
    return shops.flatMap((restaurant) =>
      restaurant.menu.map((menuItem) => menuItem)
    );
  }
  // getMenuByPlace(shops: Restaurant[], id: string) {
  //   return shops.filter((shop) => shop._id === id);
  // }
  getMenuByPlace(id: string) {
    const url = `${this.URL}/restaurants/${id}`;
    this.http.get<Restaurant>(url).subscribe((data) => this.menu.next(data));
  }
}

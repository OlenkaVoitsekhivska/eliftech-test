import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { MenuItem } from 'src/app/models/menu-item';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {
    const cartContents = this.getItems();
    this.cart.next(cartContents);
  }
  URL = 'http://localhost:3000/api';
  cart = new BehaviorSubject<MenuItem[]>([]);
  cart$ = this.cart.asObservable();

  price = new BehaviorSubject<number>(0);
  price$ = this.price.asObservable();

  addItem(item: MenuItem) {
    const cartContents = this.getItems();
    if (!cartContents.length) {
      this.createCart({ ...item, qnt: 1 });
      // this.cart.next([{ ...item, qnt: 1 }]);
      this.forwardChangesToSubs(this.cart, [{ ...item, qnt: 1 }]);
    }
    const isInCart = this.findProdById(cartContents, item);
    if (isInCart) {
      const updatedItem = { ...isInCart, qnt: (isInCart.qnt += 1) };
      const updatedCart = cartContents.map((prod) =>
        prod._id === item._id ? updatedItem : prod
      );
      this.updateCart(updatedCart);
      // this.cart.next(updatedCart);
      this.forwardChangesToSubs(this.cart, updatedCart);
    } else {
      const newItem = { ...item, qnt: 1 };
      const updatedCart = [...cartContents, newItem];
      this.updateCart(updatedCart);
      // this.cart.next(updatedCart);
      this.forwardChangesToSubs(this.cart, updatedCart);
    }
  }

  deleteItem(item: MenuItem) {
    const cartContents = this.getItems();
    const updatedCart = cartContents.filter((prod) => prod._id !== item._id);
    this.updateCart(updatedCart);
    // this.cart.next(updatedCart);
    this.forwardChangesToSubs(this.cart, updatedCart);
    this.calculatePrice();
  }

  findProdById(cart: MenuItem[], item: MenuItem) {
    return cart.find((prod) => prod._id === item._id);
  }

  getItems(): MenuItem[] {
    return JSON.parse(localStorage.getItem('cart')!) || [];
  }

  createCart(data: MenuItem) {
    localStorage.setItem('cart', JSON.stringify([data]));
  }

  updateCart(data: MenuItem[]) {
    localStorage.setItem('cart', JSON.stringify(data));
  }

  clearCart() {
    localStorage.clear();
  }

  forwardChangesToSubs(subj: BehaviorSubject<any>, data: any) {
    // this.cart.next(data);
    subj.next(data);
  }
  calculatePrice() {
    const cart = this.getItems();
    const price = cart.reduce(
      (acc, prod) => parseFloat(prod.price) * prod.qnt + acc,
      0
    );
    // this.price.next(price);
    this.forwardChangesToSubs(this.price, price);
  }

  updateQnt(prod: MenuItem, input: string) {
    const cart = this.getItems();
    const item = this.findProdById(cart, prod);
    const updatedItem = { ...item, qnt: input };
    // const updatedCart = cart.map((prod) =>
    //   prod._id === item?._id ? updatedItem : prod
    // );
    // this.updateCart(updatedCart);
    this.forwardChangesToSubs(this.cart, updatedItem);
    this.calculatePrice();
  }

  postOrder(data: any) {
    const url = `${this.URL}/orders`;
    this.http.post(url, data);
  }
}

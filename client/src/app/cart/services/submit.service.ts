import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  Subject,
  combineLatest,
  distinctUntilChanged,
  finalize,
  map,
  skipWhile,
  switchMap,
  tap,
  zip,
} from 'rxjs';
import { CartService } from 'src/app/core/services/cart.service';
import { MenuItem } from 'src/app/models/menu-item';

@Injectable({
  providedIn: 'root',
})
export class SubmitService {
  URL = 'http://localhost:3000/api';

  formData = new Subject<FormData>();
  itemList = new BehaviorSubject<MenuItem[]>([]);
  submitClicks = new BehaviorSubject<boolean>(false);
  combinedStreams$!: Observable<any>;

  cleanAfterSubmit = new BehaviorSubject<boolean>(false);
  cleanAfterSubmit$ = this.cleanAfterSubmit.asObservable();

  constructor(
    private http: HttpClient,
    private cartS: CartService,
    private router: Router
  ) {
    this.combineStreams().subscribe((data) => {
      console.log('i am a submit service', data);
      alert('congrats! You have placed an order!');
      // this.cleanAfterSubmit.next(true);
      // this.router.navigate(['shops']);
    });
  }

  updateFormData(data: FormData) {
    this.formData.next(data);
    console.log('updating the form data...', data);
  }

  updateListData(data: any) {
    this.itemList.next(data);
  }

  updateClicks(click: boolean) {
    this.submitClicks.next(click);
    console.log('updating the clicks data', click);
  }

  combineStreams() {
    // return zip(
    //   this.formData.asObservable(),
    //   this.itemList.asObservable(),
    //   this.submitClicks.asObservable()
    // ).pipe(
    //   skipWhile(([, , clicks]) => !clicks),
    //   switchMap(([form, list]) => {
    //     const order = {
    //       client: form,
    //       order: list,
    //     };
    //     return this.postOrder(order);
    //   })
    // );
    return combineLatest([
      this.formData.asObservable(),
      this.itemList.asObservable(),
      this.submitClicks.asObservable(),
    ]).pipe(
      skipWhile(([, , clicks]) => !clicks),
      switchMap(([form, list]) => {
        const order = {
          client: form,
          order: list,
        };
        return this.postOrder(order);
      })
    );
  }

  postOrder(data: any) {
    const url = `${this.URL}/orders`;
    return this.http.post(url, data);
  }
}

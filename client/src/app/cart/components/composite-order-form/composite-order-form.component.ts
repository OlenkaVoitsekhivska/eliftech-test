import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  combineLatest,
  map,
  tap,
} from 'rxjs';
import { cartSelector } from 'src/app/store/cart/selectors';
import { AppState } from 'src/app/store/models/appState';
import * as cartActions from 'src/app/store/cart/actions';
import { MenuItem } from 'src/app/models/menu-item';

@Component({
  selector: 'app-composite-order-form',
  templateUrl: './composite-order-form.component.html',
  styleUrls: ['./composite-order-form.component.scss'],
})
export class CompositeOrderFormComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  public price$ = this.store
    .select(cartSelector)
    .pipe(
      map((cart) =>
        cart.items.reduce(
          (acc: number, item: { price: any; qnt: number }) =>
            acc + Number(item.price) * item.qnt,
          0
        )
      )
    );

  public errorBlueprint = 'Enter a valid';

  public errorMessage = {
    name: `${this.errorBlueprint} name`,
    email: `${this.errorBlueprint} email`,
    phone: `${this.errorBlueprint} phone`,
    address: `${this.errorBlueprint} address`,
  };
  public showForm = false;

  private cartState$: Observable<{ items: MenuItem[] }> =
    this.store.select(cartSelector);
  private combinedState$!: Subscription;
  private shouldSubmit = new BehaviorSubject<boolean>(false);
  private shouldSubmit$ = this.shouldSubmit;

  get name() {
    return this.form.get('name');
  }
  get email() {
    return this.form.get('email');
  }
  get phone() {
    return this.form.get('phone');
  }
  get address() {
    return this.form.get('address');
  }

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
    this.initCombinedState();
  }

  ngOnDestroy() {
    if (this.combinedState$) {
      this.combinedState$.unsubscribe();
    }
  }

  public handleSubmit() {
    this.shouldSubmit.next(true);
    this.router.navigate(['cart', 'success']);
  }

  private initForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/[0-9]/)]],
      address: ['', Validators.required],
    });
  }

  private initCombinedState() {
    this.combinedState$ = combineLatest([this.cartState$, this.shouldSubmit$])
      .pipe(
        map(([cartState, shouldSubmit]) => [cartState.items, shouldSubmit]),
        tap(([cart, shouldSubmit]) => {
          if (typeof cart !== 'boolean') {
            this.showForm = cart.length > 0;
          }
          if (shouldSubmit) {
            this.store.dispatch(
              cartActions.placeOrder({
                user: this.form.value,
                items: cart as MenuItem[],
              })
            );
          }
        })
      )
      .subscribe();
  }
}

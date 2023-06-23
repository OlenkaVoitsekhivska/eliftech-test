import {
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Router } from '@angular/router';

//Form
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//Store
import { Store } from '@ngrx/store';
import { cartSelector } from 'src/app/store/cart/selectors';
import { AppState } from 'src/app/store/models/appState';
import * as cartActions from 'src/app/store/cart/actions';

import {
  BehaviorSubject,
  Observable,
  Subscription,
  combineLatest,
  map,
  tap,
} from 'rxjs';

//Models
import { MenuItem } from 'src/app/models/menu-item';
import { PATTERNS } from 'src/app/regex-patterns/inputPatterns';
import { InputTypeEnum } from 'src/app/models/enums';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-composite-order-form',
  templateUrl: './composite-order-form.component.html',
  styleUrls: ['./composite-order-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompositeOrderFormComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  public price$: Observable<number> = this.store
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

  public validationPatterns = PATTERNS;
  public showForm = false;
  public inputTypeEnum = InputTypeEnum;

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

  CURRENCY_CODE!: string;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    public errorMatcher: ErrorStateMatcher
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
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(this.validationPatterns.EMAIL),
        ],
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validationPatterns.PHONE),
        ],
      ],
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

import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubmitService } from '../../services/submit.service';
import { requiredLength } from './validators';
import { debounceTime, distinctUntilChanged, skipWhile } from 'rxjs';
import { AppState } from 'src/app/store/shops/reducers';
import { Store } from '@ngrx/store';
import * as cartActions from '../../../../app/store/cart/actions';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  form!: FormGroup;

  ERROR_TEMPLATE = 'Enter a valid ';

  errorMsg = {
    name: `${this.ERROR_TEMPLATE}name`,
    email: `${this.ERROR_TEMPLATE}email`,
    phone: `${this.ERROR_TEMPLATE}phone`,
    address: `${this.ERROR_TEMPLATE}address`,
  };

  cleanAfterSubmit = this.submitS.cleanAfterSubmit$;

  constructor(
    private formBuilder: FormBuilder,
    private submitS: SubmitService,
    private store: Store<AppState>
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
    });

    this.form.valueChanges
      .pipe(
        skipWhile((f) => !f.name || !f.email || !f.phone || !f.address),
        debounceTime(1000)
      )
      .subscribe((data) => {
        console.log('FORM CHANGES', data);
        this.store.dispatch(cartActions.placeOrder({ form: data }));
        // this.submitS.updateFormData(data);
      });

    // this.cleanAfterSubmit.subscribe((c) => {
    //   if (c === true) {
    //     this.form.reset();
    //   }
    // });
  }

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
}

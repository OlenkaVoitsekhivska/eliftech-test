import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubmitService } from '../../services/submit.service';
import { requiredLength } from './validators';
import { distinctUntilChanged, skipWhile } from 'rxjs';

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
    private submitS: SubmitService
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
    });

    this.form.valueChanges
      .pipe(skipWhile((f) => !f.name || !f.email || !f.phone || !f.address))
      .subscribe((data) => {
        console.log('FORM CHANGES', data);
        this.submitS.updateFormData(data);
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

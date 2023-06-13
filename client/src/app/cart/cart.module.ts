import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { FormComponent } from './components/form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CartContentsComponent } from './components/cart-contents/cart-contents.component';

@NgModule({
  declarations: [CartComponent, FormComponent, CartContentsComponent],
  imports: [CommonModule, CartRoutingModule, ReactiveFormsModule, SharedModule],
})
export class CartModule {}

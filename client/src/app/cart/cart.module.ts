//MODULES
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CartRoutingModule } from 'src/app/cart/cart-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

//COMPONENTS
import { CartContentsComponent } from 'src/app/cart/components/cart-contents/cart-contents.component';
import { CompositeOrderFormComponent } from 'src/app/cart/components/composite-order-form/composite-order-form.component';
import { SharedTranslationModule } from '../shared-translation/shared-translation.module';
import { ErrorStateMatcher } from '@angular/material/core';
import { CustomErrorStateMatcher } from './components/custom-error-state-matcher/custom-error-state-matcher.component';

@NgModule({
  declarations: [CartContentsComponent, CompositeOrderFormComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    SharedTranslationModule,
  ],
  providers: [
    { provide: ErrorStateMatcher, useClass: CustomErrorStateMatcher },
  ],
})
export class CartModule {}

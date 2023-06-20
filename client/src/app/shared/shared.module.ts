//MODULES
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

//COMPONENTS
import { ButtonComponent } from 'src/app/shared/button/button.component';
import { CardComponent } from 'src/app/shared/card/card.component';
import { InputComponent } from 'src/app/shared/input/input.component';
import { CartProductCardComponent } from 'src/app/shared/cart-product-card/cart-product-card.component';
import { SuccessfulOrderComponent } from 'src/app/shared/successful-order/successful-order.component';
import { SetAttributeDirective } from './directives/set-attribute.directive';

@NgModule({
  declarations: [
    ButtonComponent,
    CardComponent,
    InputComponent,
    CartProductCardComponent,
    SuccessfulOrderComponent,
    SetAttributeDirective,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    HttpClientModule,
    MatSnackBarModule,
  ],
  exports: [
    ButtonComponent,
    CardComponent,
    InputComponent,
    FormsModule,
    CartProductCardComponent,
    MatIconModule,
    HttpClientModule,
    MatInputModule,
    MatSnackBarModule,
    SuccessfulOrderComponent,
    SetAttributeDirective,
  ],
})
export class SharedModule {}

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
import { MatSelectModule } from '@angular/material/select';
import { SharedTranslationModule } from '../shared-translation/shared-translation.module';

//COMPONENTS
import { ButtonComponent } from 'src/app/shared/button/button.component';
import { CardComponent } from 'src/app/shared/card/card.component';
import { CartProductCardComponent } from 'src/app/shared/cart-product-card/cart-product-card.component';
import { SuccessfulOrderComponent } from 'src/app/shared/successful-order/successful-order.component';
import { CurrencyPipe } from './pipes/currency.pipe';

@NgModule({
  declarations: [
    ButtonComponent,
    CardComponent,
    CartProductCardComponent,
    SuccessfulOrderComponent,
    CurrencyPipe,
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
    MatSelectModule,
    SharedTranslationModule,
  ],
  exports: [
    ButtonComponent,
    CardComponent,
    FormsModule,
    CartProductCardComponent,
    MatIconModule,
    HttpClientModule,
    MatInputModule,
    MatSnackBarModule,
    SuccessfulOrderComponent,
    MatSelectModule,
    CurrencyPipe,
  ],
})
export class SharedModule {}

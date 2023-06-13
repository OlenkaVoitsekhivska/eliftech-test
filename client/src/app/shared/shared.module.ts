import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { MatButtonModule } from '@angular/material/button';
import { CardComponent } from './card/card.component';
import { MatCardModule } from '@angular/material/card';
import { InputComponent } from './input/input.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CartProductCardComponent } from './cart-product-card/cart-product-card.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    ButtonComponent,
    CardComponent,
    InputComponent,
    CartProductCardComponent,
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
  ],
  exports: [
    ButtonComponent,
    CardComponent,
    InputComponent,
    FormsModule,
    CartProductCardComponent,
    MatIconModule,
    HttpClientModule,
  ],
})
export class SharedModule {}

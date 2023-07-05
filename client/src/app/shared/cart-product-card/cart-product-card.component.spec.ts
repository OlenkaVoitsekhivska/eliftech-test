import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartProductCardComponent } from './cart-product-card.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CartProductCardComponent', () => {
  let component: CartProductCardComponent;
  let fixture: ComponentFixture<CartProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartProductCardComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CartProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompositeOrderFormComponent } from './composite-order-form.component';

describe('CompositeOrderFormComponent', () => {
  let component: CompositeOrderFormComponent;
  let fixture: ComponentFixture<CompositeOrderFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompositeOrderFormComponent]
    });
    fixture = TestBed.createComponent(CompositeOrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

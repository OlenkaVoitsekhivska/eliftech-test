import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompositeOrderFormComponent } from './composite-order-form.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { initialState } from 'src/app/store/initialState';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { map } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { TestScheduler } from 'rxjs/testing';
import { CartContentsComponent } from '../cart-contents/cart-contents.component';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { TranslateService } from '@ngx-translate/core';
import { TRANSLATIONS } from 'src/app/shared/testing/translationConfig';
import { AppState } from 'src/app/store/models/appState';
import { selectOptions, mockSingleItem } from 'src/app/shared/testing/mockData';

describe('CompositeOrderFormComponent', () => {
  let component: CompositeOrderFormComponent;
  let fixture: ComponentFixture<CompositeOrderFormComponent>;
  let store: MockStore<AppState>;
  let scheduler: TestScheduler;
  let translateService: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateTestingModule.withTranslations(TRANSLATIONS)],
      declarations: [CompositeOrderFormComponent, CartContentsComponent],
      providers: [
        RouterTestingModule,
        ReactiveFormsModule,
        provideMockStore({
          initialState,
        }),
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(CompositeOrderFormComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    translateService = TestBed.inject(TranslateService);
    translateService.setDefaultLang(selectOptions.en.value); // Set the default language
    translateService.use(selectOptions.en.value);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reduce cart data to total sum', () => {
    scheduler.run(({ cold, expectObservable }) => {
      const source$ = cold('a', {
        a: {
          user: null,
          items: [
            {
              ...mockSingleItem,
            },
          ],
        },
      });

      component.price$ = source$.pipe(
        map((cart) =>
          cart.items.reduce(
            (acc: number, item: { price: any; qnt: number }) =>
              acc + Number(item.price) * item.qnt,
            0
          )
        )
      );
      expectObservable(component.price$).toBe('a', { a: 9.99 });
    });
  });
  it('should display form', () => {
    component.showForm = !component.showForm;
    expect(component.showForm).toBeTrue();
  });
});

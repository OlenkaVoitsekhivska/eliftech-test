import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartContentsComponent } from './cart-contents.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TestScheduler } from 'rxjs/testing';
import { MenuItem } from 'src/app/models/menu-item';
import { User } from 'src/app/store/models/user';
import { map, of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { deleteItem, editQntItem } from 'src/app/store/cart/actions';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { TranslateService } from '@ngx-translate/core';
import { MockConvertPipe } from 'src/app/shared/testing/mocks/convertPipe';
import { TRANSLATIONS } from 'src/app/shared/testing/translationConfig';
import { queryById } from 'src/app/shared/testing/helpers/queryById';
import {
  selectOptions,
  mockSingleItem,
  mockStoreInitStateCart,
} from 'src/app/shared/testing/mockData';

describe('CartContentsComponent', () => {
  let store: MockStore;
  let component: CartContentsComponent;
  let fixture: ComponentFixture<CartContentsComponent>;
  let scheduler: TestScheduler;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateTestingModule.withTranslations(TRANSLATIONS)],
      declarations: [CartContentsComponent, MockConvertPipe],
      providers: [
        provideMockStore({
          initialState: {
            ...mockStoreInitStateCart,
          },
        }),
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CartContentsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
    translateService = TestBed.inject(TranslateService);
    translateService.setDefaultLang(selectOptions.en.value); // Set the default language
    translateService.use(selectOptions.en.value);
    component.cartData$ = of([mockSingleItem]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('selects the "shops" piece of state', () => {
    scheduler.run(({ cold, expectObservable }) => {
      const projectedMockData: {
        [marble: string]: { user: User | null; items: MenuItem[] };
      } = {
        a: {
          user: null,
          items: [mockSingleItem],
        },
      };

      const source$ = cold('a|', projectedMockData);
      component.cartData$ = source$.pipe(map((cart) => cart.items));

      expectObservable(component.cartData$).toBe('a|', {
        a: [mockSingleItem],
      });
    });
  });

  it('updates the item qnt if qnt is valid', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    const inputField = queryById(fixture, 'qnt-input');
    inputField.value = '4';
    inputField.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledWith(
      editQntItem({
        item: mockSingleItem,
        qnt: 4,
      })
    );
  });

  it('calls click handle method', async () => {
    const clickHandler = spyOn(component, 'handleClick');
    const deleteBtn = fixture.debugElement.query(By.css('app-button'));
    deleteBtn.triggerEventHandler('customClick', mockSingleItem);
    fixture.detectChanges();

    expect(clickHandler).toHaveBeenCalled();
  });

  it('dispatches delete action on click', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    const deleteBtn = fixture.debugElement.query(
      By.css('app-button')
    ).componentInstance;
    deleteBtn.handleClick(mockSingleItem);
    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(
      deleteItem({ item: mockSingleItem })
    );
  });
});

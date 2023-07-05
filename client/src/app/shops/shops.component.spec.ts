import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShopsComponent } from './shops.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../store/initialState';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { getShops } from '../store/shops/actions';
import { ButtonComponent } from '../shared/button/button.component';
import { MockConvertPipe } from '../shared/testing/mocks/convertPipe';
import { TranslateService } from '@ngx-translate/core';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { TRANSLATIONS } from 'src/app/shared/testing/translationConfig';
import { selectOptions, mockSingleItem } from 'src/app/shared/testing/mockData';

describe('ShopsComponent', () => {
  let store: MockStore;
  let component: ShopsComponent;
  let fixture: ComponentFixture<ShopsComponent>;
  let scheduler: TestScheduler;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateTestingModule.withTranslations(TRANSLATIONS)],
      declarations: [ShopsComponent, MockConvertPipe, ButtonComponent],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: (param: string) => 'exampleId' }), // Simulate paramMap value for testing
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ShopsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);

    translateService = TestBed.inject(TranslateService);
    translateService.setDefaultLang(selectOptions.en.value); // Set the default language
    translateService.use(selectOptions.en.value);

    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('dispatches getShops action on init', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(getShops());
  });
  it('dispatches addItem action after clicking the menu item', () => {
    component.itemsForDisplay$ = of([mockSingleItem]);
    fixture.detectChanges();
    const clickHandler = spyOn(component, 'handleClick');
    const addBtn = fixture.debugElement.query(By.directive(ButtonComponent));

    addBtn.triggerEventHandler('customClick', mockSingleItem);
    fixture.detectChanges();

    expect(clickHandler).toHaveBeenCalled();
    expect(clickHandler).toHaveBeenCalledWith(mockSingleItem);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from './store/initialState';
import { TranslateService } from '@ngx-translate/core';
import { CurrencyService } from './core/services/currency.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatSelectHarness } from '@angular/material/select/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { TRANSLATIONS } from 'src/app/shared/testing/translationConfig';
import { selectOptions } from 'src/app/shared/testing/mockData';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let loader: HarnessLoader;
  let translateService: TranslateService;

  const currencyService = jasmine.createSpyObj('currencyService', {
    getCurrencyRate: () => {},
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatSelectModule,
        NoopAnimationsModule,
        TranslateTestingModule.withTranslations(TRANSLATIONS),
      ],
      declarations: [AppComponent],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: CurrencyService,
          useValue: currencyService,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    translateService = TestBed.inject(TranslateService);
    translateService.setDefaultLang(selectOptions.en.value); // Set the default language
    translateService.use(selectOptions.en.value);

    component.itemsInCartNumber$ = of(0);
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('renders 2 links', () => {
    const links = fixture.debugElement.queryAll(By.css('a'));
    expect(links.length).toBe(2);
  });

  it('calls selectLanguage handler on language change event', async () => {
    const selectSpy = spyOn(component, 'selectLanguage');
    const select = await loader.getHarness(MatSelectHarness);
    await select.open();
    const options = await select.getOptions();
    await options[1].click();
    const selectedOptionText = await select.getValueText();

    expect(options.length).toBe(2);
    expect(selectedOptionText).toBe(selectOptions.uk.innerText);
    expect(await select.isOpen()).toBeFalse();
    expect(selectSpy).toHaveBeenCalled();
    expect(selectSpy).toHaveBeenCalledWith(selectOptions.uk.value);
  });

  it('has items counter set to 0 if cart is empty', () => {
    component.itemsInCartNumber$ = of(0);
    fixture.detectChanges();
    const cartLink = fixture.debugElement.query(
      By.css('a[routerLink="cart"]')
    ).nativeElement;
    expect(cartLink.innerText).toContain('0');
  });

  it('has items counter set to number of selected items if cart is not empty', () => {
    component.itemsInCartNumber$ = of(4);
    fixture.detectChanges();
    const cartLink = fixture.debugElement.query(
      By.css('a[routerLink="cart"]')
    ).nativeElement;
    expect(cartLink.innerText).toContain('4');
  });

  it('displays ui translated into ukrainian if uk is selected', async () => {
    const select = await loader.getHarness(MatSelectHarness);
    await select.open();
    const options = await select.getOptions();
    await options[1].click();
    fixture.detectChanges();
    translateService.use('uk');
    const cartLink = fixture.debugElement.query(
      By.css('a[routerLink="cart"]')
    ).nativeElement;
    const translatedCartText = translateService.instant('APP_COMPONENT.CART');
    expect(cartLink.innerText).toContain(translatedCartText);
  });
});

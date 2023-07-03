import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { queryById } from '../testing/helpers/queryById';
import { TranslateTestingModule } from 'ngx-translate-testing';

import { TranslateService } from '@ngx-translate/core';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { TRANSLATIONS } from 'src/app/shared/testing/translationConfig';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let loader: HarnessLoader;
  const singleItem = {
    _id: '6489e4ca99c9aa9775763a45',
    title: 'Classic Burger',
    price: '9.99',
    qnt: 1,
    shopId: '64720b1fbaf6ac095a6a48e4',
  };
  let translateService: TranslateService;
  const selectOptions = {
    uk: {
      value: 'uk',
      innerText: 'Українська',
    },
    en: {
      value: 'en',
      innerText: 'English',
    },
  };

  const label = 'delete';
  const type = 'primary';
  const disabled = false;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateTestingModule.withTranslations(TRANSLATIONS),
        MatButtonModule,
        NoopAnimationsModule,
      ],
      declarations: [ButtonComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);

    component = fixture.componentInstance;
    component.label = label;
    component.type = type;
    component.disabled = disabled;

    translateService = TestBed.inject(TranslateService);
    translateService.setDefaultLang(selectOptions.en.value); // Set the default language
    translateService.use(selectOptions.en.value);

    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('accepts and displays label', () => {
    const actualLabelText = queryById(fixture, 'button').innerText;
    expect(actualLabelText).toBe(label);
  });

  it('accepts disabled state', () => {
    const actualDisabled = queryById(fixture, 'button');
    expect(actualDisabled.disabled).toBe(disabled);
  });

  it('emits label on click', () => {
    const emitSpy = spyOn(component.customClick, 'emit');

    component.handleClick(label);

    expect(emitSpy).toHaveBeenCalled();
    expect(emitSpy).toHaveBeenCalledWith(label);
  });

  it('displays ui in english if en is selected (default)', async () => {
    const btnRef = await loader.getHarness(MatButtonHarness);
    const btnText = await btnRef.getText();

    const expectedTranslation = translateService.instant(label);
    expect(btnText).toBe(expectedTranslation);
  });

  it('displays ui in ukrainian if uk is selected (default)', async () => {
    const btnRef = await loader.getHarness(MatButtonHarness);
    const btnText = await btnRef.getText();
    translateService.use(selectOptions.uk.value);
    fixture.detectChanges();

    const expectedTranslation = translateService.instant(label);
    expect(btnText).toBe(expectedTranslation);
  });
});

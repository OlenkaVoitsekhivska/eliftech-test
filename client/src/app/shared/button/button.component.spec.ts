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
import { selectOptions, mockBtnParams } from 'src/app/shared/testing/mockData';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let loader: HarnessLoader;
  let translateService: TranslateService;

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
    component.label = mockBtnParams.label;
    component.type = mockBtnParams.type as 'accent' | 'primary';
    component.disabled = mockBtnParams.disabled;

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
    expect(actualLabelText).toBe(mockBtnParams.label);
  });

  it('accepts disabled state', () => {
    const actualDisabled = queryById(fixture, 'button');
    expect(actualDisabled.disabled).toBe(mockBtnParams.disabled);
  });

  it('emits label on click', () => {
    const emitSpy = spyOn(component.customClick, 'emit');

    component.handleClick(mockBtnParams.label);

    expect(emitSpy).toHaveBeenCalled();
    expect(emitSpy).toHaveBeenCalledWith(mockBtnParams.label);
  });

  it('displays ui in english if en is selected (default)', async () => {
    const btnRef = await loader.getHarness(MatButtonHarness);
    const btnText = await btnRef.getText();

    const expectedTranslation = translateService.instant(mockBtnParams.label);
    expect(btnText).toBe(expectedTranslation);
  });

  it('displays ui in ukrainian if uk is selected (default)', async () => {
    const btnRef = await loader.getHarness(MatButtonHarness);
    const btnText = await btnRef.getText();
    translateService.use(selectOptions.uk.value);
    fixture.detectChanges();

    const expectedTranslation = translateService.instant(mockBtnParams.label);
    expect(btnText).toBe(expectedTranslation);
  });
});

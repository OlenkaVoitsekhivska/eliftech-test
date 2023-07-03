import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfulOrderComponent } from './successful-order.component';
import { TranslateService } from '@ngx-translate/core';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { By } from '@angular/platform-browser';
import { TRANSLATIONS } from 'src/app/shared/testing/translationConfig';
import { selectOptions } from 'src/app/shared/testing/mockData';

describe('SuccessfulOrderComponent', () => {
  let component: SuccessfulOrderComponent;
  let fixture: ComponentFixture<SuccessfulOrderComponent>;
  let translateService: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateTestingModule.withTranslations(TRANSLATIONS)],
      declarations: [SuccessfulOrderComponent],
    });
    fixture = TestBed.createComponent(SuccessfulOrderComponent);
    component = fixture.componentInstance;

    translateService = TestBed.inject(TranslateService);
    translateService.setDefaultLang(selectOptions.en.value); // Set the default language
    translateService.use(selectOptions.en.value);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('displays message in english', () => {
    const messageText = fixture.debugElement.query(By.css('h2')).nativeElement;
    const expectedTranslation = translateService.instant('ORDER.SUCCESS');
    expect(messageText.innerText).toBe(expectedTranslation);
  });
  it('displays message in ukrainian', () => {
    translateService.use(selectOptions.uk.value);
    fixture.detectChanges();
    const messageText = fixture.debugElement.query(By.css('h2')).nativeElement;
    const expectedTranslation = translateService.instant('ORDER.SUCCESS');
    expect(messageText.innerText).toBe(expectedTranslation);
  });
});

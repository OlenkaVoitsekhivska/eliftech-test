import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { CurrencyService } from './currency.service';
import { CurrencyResponseObj } from 'src/app/models/privatCurrency';
import { mockCurrency } from 'src/app/shared/testing/mockData';

describe('CurrencyService', () => {
  let service: CurrencyService;
  let controller: HttpTestingController;

  const expectedUrl =
    'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11';
  let expectedData: CurrencyResponseObj[] = [];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CurrencyService],
    });
    service = TestBed.inject(CurrencyService);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('gets currency rate', () => {
    service
      .getCurrencyRate()
      .subscribe((res: CurrencyResponseObj[]) => (expectedData = res));
    controller.expectOne(expectedUrl).flush(mockCurrency);

    expect(expectedData).toEqual(mockCurrency);
  });
});

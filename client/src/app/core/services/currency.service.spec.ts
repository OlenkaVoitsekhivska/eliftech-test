import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { CurrencyService } from './currency.service';

interface CurrencyResponseObj {
  ccy: string;
  base_ccy: string;
  buy: string;
  sale: string;
}

describe('CurrencyService', () => {
  let service: CurrencyService;
  let controller: HttpTestingController;

  const expectedUrl =
    'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11';
  let expectedData: CurrencyResponseObj[] = [];

  const fakeData: CurrencyResponseObj[] = [
    {
      ccy: 'EUR',
      base_ccy: 'UAH',
      buy: '39.77380',
      sale: '41.49378',
    },
    {
      ccy: 'USD',
      base_ccy: 'UAH',
      buy: '36.56860',
      sale: '37.45318',
    },
  ];

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
    controller.expectOne(expectedUrl).flush(fakeData);

    expect(expectedData).toEqual(fakeData);
  });
});

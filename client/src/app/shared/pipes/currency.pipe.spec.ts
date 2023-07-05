import { CurrencyPipe } from './currency.pipe';

describe('CurrencyPipe', () => {
  let pipe: CurrencyPipe;
  const dollarRate = 36.5686;
  const price = '9.99';

  beforeEach(() => {
    pipe = new CurrencyPipe();
    sessionStorage.setItem('dollarRate', JSON.stringify(dollarRate));
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('returns price in usd if locale is en, value type string', () => {
    expect(pipe.transform(price, 'USD')).toBe(+price);
  });

  it('returns price in usd if locale is en, value type number', () => {
    expect(pipe.transform(+price, 'USD')).toBe(+price);
  });

  it('returns price in uah if locale is ua, value type string', () => {
    expect(pipe.transform(price, 'UAH')).toBe(+price * dollarRate);
  });

  it('returns price in uah if locale is ua, value type number', () => {
    expect(pipe.transform(+price, 'UAH')).toBe(+price * dollarRate);
  });

  it('returns 0 if value is null', () => {
    expect(pipe.transform(null, 'USD')).toBe(0);
  });
});

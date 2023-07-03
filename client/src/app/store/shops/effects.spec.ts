import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { ShopEffects } from './effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { getShops, getShopsSuccess } from './actions';
import { initialState } from '../initialState';

import { TestScheduler } from 'rxjs/testing';
import { ShopsService } from 'src/app/core/services/shops.service';
import { mockRestaurantData } from 'src/app/shared/testing/mockData';

describe('ShopEffects', () => {
  const shopsService = jasmine.createSpyObj('shopsService', [
    'getRestaurants',
    'postOrder',
  ]);
  let effects: ShopEffects;
  let actions: Observable<any>;
  let store: MockStore<any>;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ShopEffects,
        provideMockStore({ initialState }),
        provideMockActions(() => actions),
        { provide: ShopsService, useValue: shopsService },
      ],
    });

    effects = TestBed.inject(ShopEffects);
    store = TestBed.inject(MockStore);

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('get shops', () => {
    it('returns a getAllSuccess action', () => {
      const action = getShops();
      const outcome = getShopsSuccess({ shops: mockRestaurantData });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: action });
        const response = cold('-b|', { b: mockRestaurantData });
        shopsService.getRestaurants.and.returnValue(response);

        expectObservable(effects.loadShops$).toBe('--b', { b: outcome });
      });
    });
  });
});

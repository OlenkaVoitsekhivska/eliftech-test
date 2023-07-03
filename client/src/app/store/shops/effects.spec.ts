import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { ShopEffects } from './effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { getShops, getShopsSuccess } from './actions';
import { initialState } from '../initialState';

import { TestScheduler } from 'rxjs/testing';
import { ShopsService } from 'src/app/core/services/shops.service';
import { Restaurant } from 'src/app/models/restaurant';

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
      const fakeRestaurantData: Restaurant[] = [
        {
          _id: '64720b1fbaf6ac095a6a48e4',
          name: 'Burger joint',
          menu: [
            {
              _id: '6489e4ca99c9aa9775763a45',
              title: 'Classic Burger',
              price: '9.99',
              qnt: 0,
              shopId: '64720b1fbaf6ac095a6a48e4',
            },
          ],
        },
      ];
      const action = getShops();
      const outcome = getShopsSuccess({ shops: fakeRestaurantData });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: action });
        const response = cold('-b|', { b: fakeRestaurantData });
        shopsService.getRestaurants.and.returnValue(response);

        expectObservable(effects.loadShops$).toBe('--b', { b: outcome });
      });
    });
  });
});

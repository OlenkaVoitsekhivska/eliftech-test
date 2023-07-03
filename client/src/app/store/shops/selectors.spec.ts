import { shopsSelector } from './selectors';
import { initialState } from '../initialState';
import { mockRestaurantData } from 'src/app/shared/testing/mockData';

describe('Cart selector', () => {
  it('selects the cart', () => {
    const result = shopsSelector.projector({
      ...initialState,
      shops: [...mockRestaurantData],
    });

    expect(result.length).toBe(1);
  });
});

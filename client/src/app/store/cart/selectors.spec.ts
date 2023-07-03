import { cartSelector } from './selectors';
import { initialState } from '../initialState';
import { mockItemQntZero } from '../test/mockData/cart';

describe('Cart selector', () => {
  it('selects the cart', () => {
    const result = cartSelector.projector({
      ...initialState,
      cart: {
        user: null,
        items: [mockItemQntZero],
      },
    });

    expect(result.items.length).toBe(1);
  });
});

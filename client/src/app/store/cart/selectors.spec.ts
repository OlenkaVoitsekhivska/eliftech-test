import { cartSelector } from './selectors';
import { initialState } from '../initialState';

describe('Cart selector', () => {
  const newItem = {
    _id: '6489e4ca99c9aa9775763a45',
    title: 'Classic Burger',
    price: '9.99',
    qnt: 0,
    shopId: '64720b1fbaf6ac095a6a48e4',
  };

  it('selects the cart', () => {
    const result = cartSelector.projector({
      ...initialState,
      cart: {
        user: null,
        items: [newItem],
      },
    });

    expect(result.items.length).toBe(1);
  });
});

import { shopsSelector } from './selectors';
import { initialState } from '../initialState';
import { Restaurant } from 'src/app/models/restaurant';

describe('Cart selector', () => {
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

  it('selects the cart', () => {
    const result = shopsSelector.projector({
      ...initialState,
      shops: [...fakeRestaurantData],
    });

    expect(result.length).toBe(1);
  });
});

import { shopsReducer } from './reducers';
import { initialState } from '../initialState';
import * as actions from './actions';

describe('Shops reducer', () => {
  const fakeShopData = [
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

  it('fetches the list of shops', () => {
    const action = actions.getShopsSuccess({ shops: [...fakeShopData] });
    const store = shopsReducer(initialState.shops, action);
    expect(store).toEqual([...fakeShopData]);
  });
});
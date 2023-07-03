import { initialState } from '../initialState';
import { cartReducer } from './reducers';
import * as actions from './actions';

describe('Cart reducer', () => {
  const newItem = {
    _id: '6489e4ca99c9aa9775763a45',
    title: 'Classic Burger',
    price: '9.99',
    qnt: 0,
    shopId: '64720b1fbaf6ac095a6a48e4',
  };
  const afterAddedUnique = {
    user: null,
    items: [{ ...newItem, qnt: 1 }],
  };
  const formUpd = {
    name: 'test',
    email: 'test@gmail.com',
    phone: 380983445029,
    address: 'test street 15',
  };

  it('returns initial state if action is unknown', () => {
    const action = {
      type: 'unknown',
    };

    const state = cartReducer(initialState.cart, action);
    expect(state).toBe(initialState.cart);
  });

  it('adds new item to the cart in qnt 1', () => {
    const action = actions.addItem({
      item: newItem,
    });

    const state = cartReducer(initialState.cart, action);
    expect(state).toEqual(afterAddedUnique);
  });

  it('increases qnt of item clicked on multiple times', () => {
    const action = actions.addItem({
      item: newItem,
    });

    const state = cartReducer(afterAddedUnique, action);
    expect(state).toEqual({
      ...afterAddedUnique,
      items: [{ ...newItem, qnt: 2 }],
    });
  });

  it('deletes item from cart', () => {
    const action = actions.deleteItem({ item: newItem });

    const state = cartReducer(afterAddedUnique, action);
    expect(state).toEqual(initialState.cart);
  });

  it('updates the order form', () => {
    const action = actions.updateForm({ form: formUpd });

    const state = cartReducer(afterAddedUnique, action);
    expect(state).toEqual({ ...afterAddedUnique, user: formUpd });
  });

  it('clears the cart after placing order', () => {
    const action = actions.clearCart();
    const state = cartReducer({ ...afterAddedUnique, user: formUpd }, action);

    expect(state).toEqual(initialState.cart);
  });
});

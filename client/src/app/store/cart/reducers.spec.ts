import { initialState } from '../initialState';
import { cartReducer } from './reducers';
import * as actions from './actions';
import {
  mockAfterAddedUnique,
  mockFormUpd,
  mockItemQntZero,
} from 'src/app/store/test/mockData/cart';

describe('Cart reducer', () => {
  it('returns initial state if action is unknown', () => {
    const action = {
      type: 'unknown',
    };

    const state = cartReducer(initialState.cart, action);
    expect(state).toBe(initialState.cart);
  });

  it('adds new item to the cart in qnt 1', () => {
    const action = actions.addItem({
      item: mockItemQntZero,
    });

    const state = cartReducer(initialState.cart, action);
    expect(state).toEqual(mockAfterAddedUnique);
  });

  it('increases qnt of item clicked on multiple times', () => {
    const action = actions.addItem({
      item: mockItemQntZero,
    });

    const state = cartReducer(mockAfterAddedUnique, action);
    expect(state).toEqual({
      ...mockAfterAddedUnique,
      items: [{ ...mockItemQntZero, qnt: 2 }],
    });
  });

  it('deletes item from cart', () => {
    const action = actions.deleteItem({ item: mockItemQntZero });

    const state = cartReducer(mockAfterAddedUnique, action);
    expect(state).toEqual(initialState.cart);
  });

  it('updates the order form', () => {
    const action = actions.updateForm({ form: mockFormUpd });

    const state = cartReducer(mockAfterAddedUnique, action);
    expect(state).toEqual({ ...mockAfterAddedUnique, user: mockFormUpd });
  });

  it('clears the cart after placing order', () => {
    const action = actions.clearCart();
    const state = cartReducer(
      { ...mockAfterAddedUnique, user: mockFormUpd },
      action
    );

    expect(state).toEqual(initialState.cart);
  });
});

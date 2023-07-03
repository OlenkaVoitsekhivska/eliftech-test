import { createReducer, on } from '@ngrx/store';
import * as actions from './actions';
import { initialState } from '../initialState';

export const cartReducer = createReducer(
  initialState.cart,
  on(actions.addItem, (state, { item }) => {
    const inCart = state.items.find((prod) => prod._id === item._id);
    if (inCart) {
      return {
        ...state,
        items: [...state.items].map((prod) =>
          prod._id === item._id ? { ...prod, qnt: prod.qnt + 1 } : prod
        ),
      };
    }

    return {
      ...state,
      items: [...state.items, { ...item, qnt: item.qnt + 1 }],
    };
  }),
  on(actions.deleteItem, (state, { item }) => ({
    ...state,
    items: [...state.items].filter((prod) => prod._id !== item._id),
  })),
  on(actions.editQntItem, (state, { item, qnt }) => ({
    ...state,
    items: [...state.items].map((prod) =>
      prod._id === item._id ? { ...prod, qnt } : prod
    ),
  })),

  on(actions.updateForm, (state, { form }) => {
    return {
      ...state,
      user: form,
    };
  }),
  on(actions.placeOrderSuccess, (state) => state),

  on(actions.clearCart, () => ({
    user: null,
    items: [],
  }))
);

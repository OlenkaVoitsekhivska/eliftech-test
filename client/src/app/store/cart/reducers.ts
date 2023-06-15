import { createReducer, on } from '@ngrx/store';
import { AppState } from '../shops/reducers';
import * as actions from './actions';

const initialState: AppState = {
  shops: [],
  cart: {
    user: null,
    items: [],
  },
};

export const cartReducer = createReducer(
  initialState.cart,
  on(actions.addItem, (state, { item }) => {
    console.log('INCOMING ITEM FOR ORDER', item);
    const inCart = state.items.find((prod) => prod._id === item._id);
    // console.log('I FOUND THIS THING', inCart);
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

  on(actions.placeOrder, (state, { form }) => {
    console.log('FORM FROM REDUCER', form);
    return {
      ...state,
      user: form,
    };
  })
);

export { AppState };

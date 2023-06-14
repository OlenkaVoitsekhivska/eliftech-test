import { createReducer, on } from '@ngrx/store';
import * as actions from './actions';
import { Restaurant } from 'src/app/models/restaurant';
import { MenuItem } from 'src/app/models/menu-item';

export interface User {
  name: string;
  email: string;
  phone: number;
  address: string;
}

export interface Cart {
  user: User | null;
  items: MenuItem[];
}

export interface AppState {
  shops: Restaurant[];
  cart: Cart;
}

const initialState: AppState = {
  shops: [],
  cart: {
    user: null,
    items: [],
  },
};

// export const shopsReducer = createReducer(
//   initialState,
//   on(actions.getShopsSuccess, (state, { shops }) => ({
//     ...state,
//     shops,
//   }))
// );
export const shopsReducer = createReducer(
  initialState.shops,
  on(actions.getShopsSuccess, (state, { shops }) => shops)
);

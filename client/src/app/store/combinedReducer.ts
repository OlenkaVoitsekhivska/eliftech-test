import { combineReducers } from '@ngrx/store';
import { shopsReducer } from './shops/reducers';
import { cartReducer } from './cart/reducers';

export const storeReducer = combineReducers({
  shops: shopsReducer,
  cart: cartReducer,
});

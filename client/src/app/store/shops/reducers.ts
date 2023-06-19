import { createReducer, on } from '@ngrx/store';

import { initialState } from 'src/app/store/initialState';
import * as actions from 'src/app/store/shops/actions';

export const shopsReducer = createReducer(
  initialState.shops,
  on(actions.getShopsSuccess, (_, { shops }) => shops)
);

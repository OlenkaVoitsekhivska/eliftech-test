import { createAction, props } from '@ngrx/store';
import { MenuItem } from 'src/app/models/menu-item';
import { Restaurant } from 'src/app/models/restaurant';
import { AppState } from './reducers';
import { User } from '../shops/reducers';

export const addItem = createAction(
  '[Shops Component] Add product',
  props<{ item: MenuItem }>()
);

// export const addItemSuccess = createAction(
//   '[Shops Component] Add product success',
//   props<{ item: MenuItem }>()
// );

export const deleteItem = createAction(
  '[Cart component] Delete product',
  props<{ item: MenuItem }>()
);

export const editQntItem = createAction(
  '[Cart component] Edit quantity of product',
  props<{ item: MenuItem; qnt: number }>()
);

export const placeOrder = createAction(
  '[Cart component] Place order',
  props<{ form: User }>()
);

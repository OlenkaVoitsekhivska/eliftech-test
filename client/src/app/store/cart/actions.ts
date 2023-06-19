import { createAction, props } from '@ngrx/store';
import { MenuItem } from 'src/app/models/menu-item';
import { User } from 'src/app/store/models/user';

export const addItem = createAction(
  '[Shops Component] Add product',
  props<{ item: MenuItem }>()
);

export const deleteItem = createAction(
  '[Cart component] Delete product',
  props<{ item: MenuItem }>()
);

export const editQntItem = createAction(
  '[Cart component] Edit quantity of product',
  props<{ item: MenuItem; qnt: number }>()
);

export const updateForm = createAction(
  '[Cart component] Update order form',
  props<{ form: User }>()
);

export const placeOrder = createAction(
  '[Cart component] Place order',
  props<{ user: User; items: MenuItem[] }>()
);

export const placeOrderSuccess = createAction(
  '[Cart component] Place order success',
  props<{ success: boolean; order: { user: User; items: MenuItem[] } }>()
);

export const clearCart = createAction(
  '[Cart component] Clear the contents of the cart'
);

import { createAction, props } from '@ngrx/store';
import { Restaurant } from 'src/app/models/restaurant';

export const getShops = createAction('[Shops Component] Get shops');
export const getShopsSuccess = createAction(
  '[Shops Component] Get shops success',
  props<{ shops: Restaurant[] }>()
);

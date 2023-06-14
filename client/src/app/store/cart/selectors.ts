import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../shops/reducers';

export const cartState = createFeatureSelector<AppState>('store');

export const cartSelector = createSelector(cartState, (store) => store.cart);

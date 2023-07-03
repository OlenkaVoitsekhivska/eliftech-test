import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppState } from 'src/app/store/models/appState';

export const cartState = createFeatureSelector<AppState>('store');

export const cartSelector = createSelector(cartState, (store) => store.cart);

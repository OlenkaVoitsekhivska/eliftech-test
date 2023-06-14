import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './reducers';

export const shopsState = createFeatureSelector<AppState>('store');

export const shopsSelector = createSelector(shopsState, (store) => store.shops);

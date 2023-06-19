import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/models/appState';

export const shopsState = createFeatureSelector<AppState>('store');

export const shopsSelector = createSelector(shopsState, (store) => store.shops);

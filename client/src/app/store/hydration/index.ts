import { MetaReducer } from '@ngrx/store';
import { hydrationMetaReducer } from './hydrationReducer';

export const metaReducers: MetaReducer[] = [hydrationMetaReducer];

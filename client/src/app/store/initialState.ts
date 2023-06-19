import { AppState } from 'src/app/store/models/appState';

export const initialState: AppState = {
  shops: [],
  cart: {
    user: null,
    items: [],
  },
};

import { MenuItem } from 'src/app/models/menu-item';
import { Restaurant } from 'src/app/models/restaurant';
import { User } from 'src/app/store/models/user';

export interface AppState {
  shops: Restaurant[];
  cart: {
    user?: User | null;
    items: MenuItem[];
  };
}

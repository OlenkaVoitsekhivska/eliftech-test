import { MenuItem } from 'src/app/models/menu-item';
import { User } from './user';

export interface OrderResponse {
  success: boolean;
  order: {
    user: User;
    items: MenuItem[];
  };
}

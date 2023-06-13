import { MenuItem } from './menu-item';

export interface Restaurant {
  _id: string;
  name: string;
  menu: MenuItem[];
}

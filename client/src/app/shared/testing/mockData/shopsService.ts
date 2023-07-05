import { OrderResponse } from 'src/app/store/models/orderResult';
import { mockSingleItem } from './singleItem';

const user = {
  name: 'test',
  email: 'test@gmail.com',
  phone: 380973415037,
  address: 'test address',
};

export const mockOrderResponse: OrderResponse = {
  success: true,
  order: {
    user,
    items: [mockSingleItem],
  },
};
export const mockOrder = {
  user,
  items: [mockSingleItem],
};

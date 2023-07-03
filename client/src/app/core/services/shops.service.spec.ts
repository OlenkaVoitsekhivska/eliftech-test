import { TestBed } from '@angular/core/testing';

import { ShopsService } from './shops.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Restaurant } from 'src/app/models/restaurant';
import { User } from 'src/app/store/models/user';
import { MenuItem } from 'src/app/models/menu-item';

describe('ShopsService', () => {
  let service: ShopsService;
  let controller: HttpTestingController;
  const fakeRestaurantData: Restaurant[] = [
    {
      _id: '64720b1fbaf6ac095a6a48e4',
      name: 'Burger joint',
      menu: [
        {
          _id: '6489e4ca99c9aa9775763a45',
          title: 'Classic Burger',
          price: '9.99',
          qnt: 0,
          shopId: '64720b1fbaf6ac095a6a48e4',
        },
      ],
    },
  ];
  const fakeOrderResponse = {
    success: true,
    order: {
      user: {
        name: 'test',
        email: 'test@gmail.com',
        phone: '380973415037',
        address: 'test address',
      },
      items: [
        {
          _id: '6489e4ca99c9aa9775763a45',
          title: 'Classic Burger',
          price: '9.99',
          qnt: 0,
          shopId: '64720b1fbaf6ac095a6a48e4',
        },
      ],
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ShopsService],
    });
    service = TestBed.inject(ShopsService);
    controller = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    controller.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('gets list of restaurants', () => {
    const url = 'http://localhost:3000/api/restaurants';
    let expectedRestaurants: Restaurant[] = [];
    service
      .getRestaurants()
      .subscribe((response) => (expectedRestaurants = response));

    controller.expectOne(url).flush(fakeRestaurantData);
    expect(expectedRestaurants).toEqual(fakeRestaurantData);
  });

  it('posts order', () => {
    const url = 'http://localhost:3000/api/orders';

    let expectedOrderResult: any;

    const order: { user: User; items: MenuItem[] } = {
      user: {
        name: 'test',
        email: 'test@gmail.com',
        phone: 380973415037,
        address: 'test address',
      },
      items: [
        {
          _id: '6489e4ca99c9aa9775763a45',
          title: 'Classic Burger',
          price: '9.99',
          qnt: 0,
          shopId: '64720b1fbaf6ac095a6a48e4',
        },
      ],
    };

    service.postOrder(order).subscribe((res) => (expectedOrderResult = res));
    controller.expectOne({ method: 'POST', url }).flush(fakeOrderResponse);

    expect(expectedOrderResult).toEqual(fakeOrderResponse);
  });
});

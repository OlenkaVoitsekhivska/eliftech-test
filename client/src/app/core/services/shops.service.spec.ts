import { TestBed } from '@angular/core/testing';

import { ShopsService } from './shops.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Restaurant } from 'src/app/models/restaurant';
import { User } from 'src/app/store/models/user';
import { MenuItem } from 'src/app/models/menu-item';
import {
  mockOrder,
  mockOrderResponse,
  mockRestaurantData,
} from 'src/app/shared/testing/mockData';
import { OrderResponse } from 'src/app/store/models/orderResult';

describe('ShopsService', () => {
  let service: ShopsService;
  let controller: HttpTestingController;

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

    controller.expectOne(url).flush(mockRestaurantData);
    expect(expectedRestaurants).toEqual(mockRestaurantData);
  });

  it('posts order', () => {
    const url = 'http://localhost:3000/api/orders';

    let expectedOrderResult!: any;

    service
      .postOrder(mockOrder)
      .subscribe((res) => (expectedOrderResult = res));
    controller.expectOne({ method: 'POST', url }).flush(mockOrderResponse);

    expect(expectedOrderResult).toEqual(mockOrderResponse);
  });
});

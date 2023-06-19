import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//MODELS
import { Restaurant } from 'src/app/models/restaurant';
import { User } from 'src/app/store/models/user';
import { MenuItem } from 'src/app/models/menu-item';

import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ShopsService {
  constructor(private http: HttpClient) {}

  public getRestaurants(): Observable<Restaurant[]> {
    const url = this.composeUrl('restaurants');
    return this.http.get<Restaurant[]>(url);
  }

  public postOrder(data: { user: User; items: MenuItem[] }): Observable<{
    succes: boolean;
    order: {
      user: User;
      items: MenuItem[];
    };
  }> {
    const { user, items } = data;
    const url = this.composeUrl('orders');
    return this.http.post<{
      succes: boolean;
      order: {
        user: User;
        items: MenuItem[];
      };
    }>(url, { user, items });
  }

  private composeUrl(endpoint: string) {
    return `${environment.apiUrl}/${endpoint}`;
  }
}

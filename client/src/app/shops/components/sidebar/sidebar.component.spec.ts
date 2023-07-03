import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { initialState } from 'src/app/store/initialState';
import { TestScheduler } from 'rxjs/testing';
import { map } from 'rxjs';
import { Restaurant } from 'src/app/models/restaurant';

describe('SidebarComponent', () => {
  let store: MockStore;
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let scheduler: TestScheduler;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);

    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('selects the "shops" piece of state', () => {
    scheduler.run(({ cold, expectObservable }) => {
      const projectedMockData: { [marble: string]: Restaurant[] } = {
        a: [
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
        ],
      };
      const expectedData = [
        { _id: '64720b1fbaf6ac095a6a48e4', name: 'Burger joint' },
      ];

      const source$ = cold('a|', projectedMockData);
      component.shops$ = source$.pipe(
        map((data) => data.map((obj) => ({ _id: obj._id, name: obj.name })))
      );

      expectObservable(component.shops$).toBe('a|', {
        a: expectedData,
      });
    });
  });
});

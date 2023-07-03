import { shopsReducer } from './reducers';
import { initialState } from '../initialState';
import * as actions from './actions';
import { mockRestaurantData } from 'src/app/shared/testing/mockData';

describe('Shops reducer', () => {
  it('fetches the list of shops', () => {
    const action = actions.getShopsSuccess({ shops: [...mockRestaurantData] });
    const store = shopsReducer(initialState.shops, action);
    expect(store).toEqual([...mockRestaurantData]);
  });
});

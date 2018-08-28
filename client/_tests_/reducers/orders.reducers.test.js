import ordersStateReducers from '../../src/reducer/orders';
import {
  SET_ORDER_SERVER_ERRORS,
  SET_UPDATED_ORDER,
} from '../../src/reducer/orders/actions';

describe('Orders Reducers', () => {
  test('Initial State', () => {
    const action = { type: 'INVALID_ACTION' };
    const initialState = { updatedOrder: {} };

    expect(ordersStateReducers(undefined, action)).toEqual(initialState);
  });

  test(SET_ORDER_SERVER_ERRORS, () => {
    const action = {
      type: SET_ORDER_SERVER_ERRORS,
      errors: {
        message: 'The meals array is required',
      },
    };
    const expectedState = {
      updatedOrder: {},
      errors: {
        message: 'The meals array is required',
      },
    };

    expect(ordersStateReducers(undefined, action)).toEqual(expectedState);
  });

  test(SET_UPDATED_ORDER, () => {
    const action = {
      type: SET_UPDATED_ORDER,
      order: { id: '123' },
    };
    const expectedState = {
      updatedOrder: { id: '123' },
    };

    expect(ordersStateReducers(undefined, action)).toEqual(expectedState);
  });
});

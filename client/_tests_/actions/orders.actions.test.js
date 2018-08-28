import configureStore from 'redux-mock-store';
import * as orderActions from '../../src/reducer/orders/actions';

const mockStore = configureStore();
const store = mockStore();

describe('Set Orders Actions', () => {
  beforeEach(() => { // Runs before each test in the suite
    store.clearActions();
  });

  test('Dispatches the correct order action and order payload', () => {
    const errors = {
      message: 'You cannot modify an order created 60 minutes earlier',
    };
    const expectedActions = [
      {
        type: 'SET_ORDER_SERVER_ERRORS',
        errors,
      },
    ];
    store.dispatch(orderActions.setOrdersErrorsAction(errors));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('Dispatches the correct order action and order payload', () => {
    const order = {
      date: '2018-07-10',
      meals: [
        {
          mealId: '123',
          units: 2,
          price: 343,
        },
      ],
    };
    const expectedActions = [
      {
        type: 'SET_UPDATED_ORDER',
        order,
      },
    ];
    store.dispatch(orderActions.setUpdatedOrderAction(order));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

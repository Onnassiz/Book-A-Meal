import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as ordersActionsDispatcher from '../../src/reducer/orders/actionsDispatcher';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({});
const mock = new MockAdapter(axios);
axios.defaults.baseURL = 'http://localhost:3009/';

describe('Orders Action Dispatchers', () => {
  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  test('Dispatches the correct actions when order is created successfully', () => {
    const response = {
      message: 'order successfully placed',
      id: '2794fddd-14f3-4ec9-a1dc-88ad2bc649da',
      date: '2018-10-10',
      contact: '01223212311',
      address: 'address',
      meals: [{ mealId: '2794fddd-14f3-4ec9-a1dc-88abc649da' }, { mealId: '2794fddd-14f3-4ec9-a1dc-88c649da' }],
    };

    mock.onPost('api/v1/orders').reply(201, response);

    const expectedActions = [
      {
        type: 'SET_LOADING',
      },
      {
        type: 'UNSET_LOADING',
      },
    ];
    store.dispatch(ordersActionsDispatcher.postOrder({})).then((res) => {
      expect(res.status).toEqual(201);
      expect(res.data).toEqual(response);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('Dispatches the correct actions when there is an error creating a order', () => {
    const response = {
      message: 'You cannot modify this order because it has been dispatched',
    };

    mock.onPost('api/v1/orders').reply(400, response);

    const expectedActions = [
      {
        type: 'SET_LOADING',
      },
      {
        type: 'UNSET_LOADING',
      },
      {
        type: 'SET_ORDER_SERVER_ERRORS',
        errors: response,
      },
    ];
    store.dispatch(ordersActionsDispatcher.postOrder({})).then((error) => {
      expect(error.response.status).toEqual(400);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('Dispatches the correct actions when order is updated successfully', () => {
    const response = {
      message: 'order successfully created',
      order: {
        id: '2794fddd-14f3-4ec9-a1dc-88ad2bc649da',
        date: '2018-10-10',
        contact: '080123121137',
        address: 'Dinner Delight',
        meals: [{ mealId: '2794fddd-14f3-4ec9-a1dc-88ad2bc649da' }, { mealId: '2794fddd-14f3-4ec9-a1dc-88ad2bc649da' }],
      },
    };

    mock.onPut('api/v1/orders/2794fddd-14f3-4ec9-a1dc-88ad2bc649da').reply(200, response);

    const expectedActions = [
      {
        type: 'SET_LOADING',
      },
      {
        type: 'UNSET_LOADING',
      },
      {
        order: response.order,
        type: 'SET_UPDATED_ORDER',
      },
    ];
    store.dispatch(ordersActionsDispatcher.updateOrder(response.order)).then((res) => {
      expect(res.status).toEqual(200);
      expect(res.data).toEqual(response);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('Dispatches the correct actions when there is an error updating an order', () => {
    const response = {
      message: 'You are not authorized',
    };

    const formData = {
      id: '2794fddd-14f3-4ec9-a1dc-88ad2bc649da',
    };

    mock.onPut('api/v1/orders/2794fddd-14f3-4ec9-a1dc-88ad2bc649da').reply(401, response);

    const expectedActions = [
      {
        type: 'SET_LOADING',
      },
      {
        type: 'UNSET_LOADING',
      },
      {
        type: 'SET_ORDER_SERVER_ERRORS',
        errors: response,
      },
    ];
    store.dispatch(ordersActionsDispatcher.updateOrder(formData)).then((error) => {
      expect(error.response.status).toEqual(401);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('Dispatches the correct actions when orders are fetched successfully', () => {
    const response = {
      count: 10,
      orders: [{ date: '2018-10-05' }, { date: '2010-112' }],
    };

    mock.onGet('api/v1/orders?limit=10&offset=0').reply(200, response);

    const expectedActions = [
      {
        type: 'SET_LOADING',
      },
      {
        type: 'UNSET_LOADING',
      },
    ];

    store.dispatch(ordersActionsDispatcher.getUserOrders()).then((res) => {
      expect(res.status).toEqual(200);
      expect(res.data).toEqual(response);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('Dispatches the correct actions when there is an error getting user orders', () => {
    const response = {
      message: 'You are not authorized',
    };

    mock.onGet('api/v1/orders?limit=10&offset=0').reply(401, response);

    const expectedActions = [
      {
        type: 'SET_LOADING',
      },
      {
        type: 'UNSET_LOADING',
      },
      {
        type: 'SET_ORDER_SERVER_ERRORS',
        errors: response,
      },
    ];
    store.dispatch(ordersActionsDispatcher.getUserOrders()).then((error) => {
      expect(error.response.status).toEqual(401);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('Dispatches the correct actions when the meals in an order is fetched successfully', () => {
    const response = {
      count: 10,
      orders: [{ date: '2018-10-05' }, { date: '2010-112' }],
    };

    const id = '2794fddd-14f3-4ec9-a1dc-88ad2bc649da';
    mock.onGet('api/v1/meals/order/2794fddd-14f3-4ec9-a1dc-88ad2bc649da?offset=0&limit=10').reply(200, response);

    const expectedActions = [
      {
        type: 'SET_LOADING',
      },
      {
        type: 'UNSET_LOADING',
      },
    ];

    store.dispatch(ordersActionsDispatcher.getMealsInOrder(id, 10, 0, false)).then((res) => {
      expect(res.status).toEqual(200);
      expect(res.data).toEqual(response);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('Dispatches the correct actions when there is an error getting the meals in an order', () => {
    const response = {
      message: 'You are not authorized',
    };

    const id = '2794fddd-14f3-4ec9-a1dc-88ad2bc649da';
    mock.onGet('api/v1/meals/order/2794fddd-14f3-4ec9-a1dc-88ad2bc649da?offset=0').reply(401, response);

    const expectedActions = [
      {
        type: 'SET_LOADING',
      },
      {
        type: 'UNSET_LOADING',
      },
      {
        type: 'SET_ORDER_SERVER_ERRORS',
        errors: response,
      },
    ];
    store.dispatch(ordersActionsDispatcher.getMealsInOrder(id, 10, 0, true)).then((error) => {
      expect(error.response.status).toEqual(401);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

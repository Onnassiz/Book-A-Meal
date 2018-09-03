import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as mealsActionsDispatcher from '../../src/reducer/meals/actionsDispatcher';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({});
const mock = new MockAdapter(axios);
axios.defaults.baseURL = 'http://localhost:3009/';

describe('Meals Action Dispatcher', () => {
  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  test('Dispatches the correct action when meal is created successfully', () => {
    const response = {
      message: 'meal successfully created',
      id: '2794fddd-14f3-4ec9-a1dc-88ad2bc649da',
      name: 'Rice',
      price: 200,
      category: 'Dinner',
      description: 'this is the description',
    };

    mock.onPost('api/v1/meals').reply(201, response);

    const expectedActions = [
      {
        type: 'SET_LOADING',
      },
      {
        type: 'UNSET_LOADING',
      },
    ];
    store.dispatch(mealsActionsDispatcher.postMeal({})).then((res) => {
      expect(res.status).toEqual(201);
      expect(res.data).toEqual(response);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('Dispatches the correct action when there is an error creating a meal', () => {
    const response = {
      message: 'meal name already exist',
    };

    mock.onPost('api/v1/meals').reply(400, response);

    const expectedActions = [
      {
        type: 'SET_LOADING',
      },
      {
        type: 'UNSET_LOADING',
      },
      {
        type: 'SET_MEAL_SERVER_ERRORS',
        errors: response,
      },
    ];
    store.dispatch(mealsActionsDispatcher.postMeal({})).then((error) => {
      expect(error.response.status).toEqual(400);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('Dispatches the correct action when meal is updated successfully', () => {
    const response = {
      message: 'meal successfully updated',
      id: '2794fddd-14f3-4ec9-a1dc-88ad2bc649da',
      name: 'Rice',
      price: 200,
      category: 'Dinner',
      description: 'this is the description',
    };

    mock.onPut('api/v1/meals/2794fddd-14f3-4ec9-a1dc-88ad2bc649da').reply(200, response);

    const expectedActions = [
      {
        type: 'SET_LOADING',
      },
      {
        type: 'UNSET_LOADING',
      },
    ];
    store.dispatch(mealsActionsDispatcher.updateMeal(response)).then((res) => {
      expect(res.status).toEqual(200);
      expect(res.data).toEqual(response);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('Dispatches the correct action when there is an error updating a meal', () => {
    const response = {
      message: 'meal name already exist',
    };

    const formData = {
      id: '2794fddd-14f3-4ec9-a1dc-88ad2bc649da',
      name: 'Rice',
    };

    mock.onPut('api/v1/meals/2794fddd-14f3-4ec9-a1dc-88ad2bc649da').reply(400, response);

    const expectedActions = [
      {
        type: 'SET_LOADING',
      },
      {
        type: 'UNSET_LOADING',
      },
      {
        type: 'SET_MEAL_SERVER_ERRORS',
        errors: response,
      },
    ];
    store.dispatch(mealsActionsDispatcher.updateMeal(formData)).then((error) => {
      expect(error.response.status).toEqual(400);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('Dispatches the correct action when meal is deleted successfully', () => {
    const response = {
      message: 'meal successfully deleted',
    };

    const id = '2794fddd-14f3-4ec9-a1dc-88ad2bc649da';

    mock.onDelete('api/v1/meals/2794fddd-14f3-4ec9-a1dc-88ad2bc649da').reply(200, response);

    const expectedActions = [
      {
        type: 'SET_LOADING',
      },
      {
        type: 'UNSET_LOADING',
      },
    ];

    store.dispatch(mealsActionsDispatcher.deleteMealById(id)).then((res) => {
      expect(res.status).toEqual(200);
      expect(res.data).toEqual(response);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('Dispatches the correct action when there is an error deleting a meal', () => {
    const response = {
      message: 'meal not found',
    };

    const id = '2794fddd-14f3-4ec9-a1dc-88ad2bc649da';

    mock.onDelete('api/v1/meals/2794fddd-14f3-4ec9-a1dc-88ad2bc649da').reply(404, response);

    const expectedActions = [
      {
        type: 'SET_LOADING',
      },
      {
        type: 'UNSET_LOADING',
      },
      {
        type: 'SET_MEAL_SERVER_ERRORS',
        errors: response,
      },
    ];
    store.dispatch(mealsActionsDispatcher.deleteMealById(id)).then((error) => {
      expect(error.response.status).toEqual(404);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('Dispatches the correct action when meals are fetched successfully', () => {
    const response = {
      count: 10,
      meals: [{ name: 'Rice' }, { name: 'Titus' }, { name: 'food' }],
    };

    mock.onGet('api/v1/meals/?limit=10&offset=0').reply(200, response);

    const expectedActions = [
      {
        type: 'SET_LOADING',
      },
      {
        type: 'UNSET_LOADING',
      },
    ];

    store.dispatch(mealsActionsDispatcher.getMeals()).then((res) => {
      expect(res.status).toEqual(200);
      expect(res.data).toEqual(response);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('Dispatches the correct action when there is an error getting meals', () => {
    const response = {
      message: 'You are not authorized',
    };

    mock.onGet('api/v1/meals/?limit=10&offset=0').reply(401, response);

    const expectedActions = [
      {
        type: 'SET_LOADING',
      },
      {
        type: 'UNSET_LOADING',
      },
      {
        type: 'SET_MEAL_SERVER_ERRORS',
        errors: response,
      },
    ];
    store.dispatch(mealsActionsDispatcher.getMeals(10, 0)).then((error) => {
      expect(error.response.status).toEqual(401);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

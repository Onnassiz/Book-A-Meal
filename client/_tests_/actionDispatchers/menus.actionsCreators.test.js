import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as menusActionsDispatcher from '../../src/reducer/menus/actionsDispatcher';

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

  test('Dispatches the correct actions when menu is created successfully', () => {
    const response = {
      message: 'menu successfully created',
      id: '2794fddd-14f3-4ec9-a1dc-88ad2bc649da',
      date: '2018-10-10',
      extraDays: 4,
      name: 'Dinner Delight',
      meals: [{ mealId: '2794fddd-14f3-4ec9-a1dc-88abc649da' }, { mealId: '2794fddd-14f3-4ec9-a1dc-88c649da' }],
    };

    mock.onPost('api/v1/menus').reply(201, response);

    const expectedActions = [
      {
        type: 'SET_LOADING',
      },
      {
        type: 'UNSET_LOADING',
      },
    ];
    store.dispatch(menusActionsDispatcher.postMenu({})).then((res) => {
      expect(res.status).toEqual(201);
      expect(res.data).toEqual(response);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('Dispatches the correct actions when there is an error creating a menu', () => {
    const response = {
      message: 'menu for this date already exist',
    };

    mock.onPost('api/v1/menus').reply(400, response);

    const expectedActions = [
      {
        type: 'SET_LOADING',
      },
      {
        type: 'UNSET_LOADING',
      },
      {
        type: 'SET_MENUS_SERVER_ERRORS',
        errors: response,
      },
    ];
    store.dispatch(menusActionsDispatcher.postMenu({})).then((error) => {
      expect(error.response.status).toEqual(400);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('Dispatches the correct actions when menu is updated successfully', () => {
    const response = {
      message: 'menu successfully created',
      id: '2794fddd-14f3-4ec9-a1dc-88ad2bc649da',
      date: '2018-10-10',
      extraDays: 4,
      name: 'Dinner Delight',
      meals: [{ mealId: '2794fddd-14f3-4ec9-a1dc-88ad2bc649da' }, { mealId: '2794fddd-14f3-4ec9-a1dc-88ad2bc649da' }],
    };

    mock.onPut('api/v1/menus/2794fddd-14f3-4ec9-a1dc-88ad2bc649da').reply(200, response);

    const expectedActions = [
      {
        type: 'SET_LOADING',
      },
      {
        type: 'UNSET_LOADING',
      },
    ];
    store.dispatch(menusActionsDispatcher.updateMenu(response)).then((res) => {
      expect(res.status).toEqual(200);
      expect(res.data).toEqual(response);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('Dispatches the correct actions when there is an error updating a menu', () => {
    const response = {
      message: 'menu name already exist',
    };

    const formData = {
      id: '2794fddd-14f3-4ec9-a1dc-88ad2bc649da',
    };

    mock.onPut('api/v1/menus/2794fddd-14f3-4ec9-a1dc-88ad2bc649da').reply(400, response);

    const expectedActions = [
      {
        type: 'SET_LOADING',
      },
      {
        type: 'UNSET_LOADING',
      },
      {
        type: 'SET_MENUS_SERVER_ERRORS',
        errors: response,
      },
    ];
    store.dispatch(menusActionsDispatcher.updateMenu(formData)).then((error) => {
      expect(error.response.status).toEqual(400);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('Dispatches the correct actions when menus is deleted successfully', () => {
    const response = {
      message: 'menus successfully deleted',
    };

    const id = '2794fddd-14f3-4ec9-a1dc-88ad2bc649da';

    mock.onDelete('api/v1/menus/2794fddd-14f3-4ec9-a1dc-88ad2bc649da').reply(200, response);

    const expectedActions = [
      {
        type: 'SET_LOADING',
      },
      {
        type: 'UNSET_LOADING',
      },
    ];

    store.dispatch(menusActionsDispatcher.deleteMenuById(id)).then((res) => {
      expect(res.status).toEqual(200);
      expect(res.data).toEqual(response);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('Dispatches the correct actions when there is an error deleting a menu', () => {
    const response = {
      message: 'menu not found',
    };

    const id = '2794fddd-14f3-4ec9-a1dc-88ad2bc649da';

    mock.onDelete('api/v1/menus/2794fddd-14f3-4ec9-a1dc-88ad2bc649da').reply(404, response);

    const expectedActions = [
      {
        type: 'SET_LOADING',
      },
      {
        type: 'UNSET_LOADING',
      },
      {
        type: 'SET_MENUS_SERVER_ERRORS',
        errors: response,
      },
    ];
    store.dispatch(menusActionsDispatcher.deleteMenuById(id)).then((error) => {
      expect(error.response.status).toEqual(404);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('Dispatches the correct actions when admin menus are fetched successfully', () => {
    const response = {
      count: 10,
      menus: [{ name: 'Good Monday' }, { name: 'Sweet Summer' }, { name: 'Best Delight' }],
    };

    mock.onGet('api/v1/menus/user/?offset=0').reply(200, response);

    const expectedActions = [
      {
        type: 'SET_LOADING',
      },
      {
        type: 'UNSET_LOADING',
      },
    ];

    store.dispatch(menusActionsDispatcher.getUserMenus()).then((res) => {
      expect(res.status).toEqual(200);
      expect(res.data).toEqual(response);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('Dispatches the correct actions when there is an error getting admin menus', () => {
    const response = {
      message: 'You are not authorized',
    };

    mock.onGet('api/v1/menus/user/?offset=0').reply(401, response);

    const expectedActions = [
      {
        type: 'SET_LOADING',
      },
      {
        type: 'UNSET_LOADING',
      },
      {
        type: 'SET_MENUS_SERVER_ERRORS',
        errors: response,
      },
    ];
    store.dispatch(menusActionsDispatcher.getUserMenus(0)).then((error) => {
      expect(error.response.status).toEqual(401);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('Dispatches the correct actions when meals in daily menus are fetched successfully', () => {
    const response = {
      count: 10,
      meals: [{ name: 'Sugar' }, { name: 'Bread' }, { name: 'Milk' }],
    };

    mock.onGet('api/v1/meals/menus/?date=2018-10-22&offset=10&limit=10').reply(200, response);

    const expectedActions = [
      {
        type: 'SET_LOADING',
      },
      {
        type: 'UNSET_LOADING',
      },
    ];

    store.dispatch(menusActionsDispatcher.getMealsInDailyMenu('2018-10-22', 10, 10)).then((res) => {
      expect(res.status).toEqual(200);
      expect(res.data).toEqual(response);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('Dispatches the correct action when there is an error getting meals in daily menus', () => {
    const response = {
      message: 'You are not authorized',
    };

    mock.onGet('api/v1/meals/menus/?date=2018-10-22&offset=10&limit=10').reply(401, response);

    const expectedActions = [
      {
        type: 'SET_LOADING',
      },
      {
        type: 'UNSET_LOADING',
      },
      {
        type: 'SET_MENUS_SERVER_ERRORS',
        errors: response,
      },
    ];
    store.dispatch(menusActionsDispatcher.getMealsInDailyMenu('2018-10-22', 10, 10)).then((error) => {
      expect(error.response.status).toEqual(401);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('Dispatches the correct actions when meals in a menu are fetched successfully', () => {
    const response = {
      count: 10,
      meals: [{ name: 'Sugar' }, { name: 'Bread' }, { name: 'Milk' }],
    };

    mock.onGet('api/v1/meals/menu/2794fddd-14f3-4ec9-a1dc-88ad2bc649da?offset=2&limit=5').reply(200, response);

    const data = {
      meals: 'api/v1/meals/menu/2794fddd-14f3-4ec9-a1dc-88ad2bc649da',
      date: '2018-10-10',
      name: 'Dinner Delight',
      mealsArray: [{ mealId: '2794fddd-14f3-4ec9-a1dc-88ad2bc649da' }, { mealId: '2794fddd-14f3-4ec9-a1dc-88ad2bc649da' }],
    };

    const expectedActions = [
      {
        type: 'SET_LOADING',
      },
      {
        type: 'UNSET_LOADING',
      },
    ];

    store.dispatch(menusActionsDispatcher.getMealsInMenu(data, 2, false)).then((res) => {
      expect(res.response.status).toEqual(200);
      expect(res.response.data).toEqual(response);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('Dispatches the correct action when there is an error getting meals in menu', () => {
    const response = {
      message: 'You are not authorized',
    };

    mock.onGet('api/v1/meals/menu/2794fddd-14f3-4ec9-a1dc-88ad2bc649da?offset=2').reply(401, response);

    const data = {
      meals: 'api/v1/meals/menu/2794fddd-14f3-4ec9-a1dc-88ad2bc649da',
      date: '2018-10-10',
      name: 'Dinner Delight',
      mealsArray: [{ mealId: '2794fddd-14f3-4ec9-a1dc-88ad2bc649da' }, { mealId: '2794fddd-14f3-4ec9-a1dc-88ad2bc649da' }],
    };

    const expectedActions = [
      {
        type: 'SET_LOADING',
      },
      {
        type: 'UNSET_LOADING',
      },
      {
        type: 'SET_MENUS_SERVER_ERRORS',
        errors: response,
      },
    ];
    store.dispatch(menusActionsDispatcher.getMealsInMenu(data, 2, true)).then((error) => {
      expect(error.response.status).toEqual(401);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

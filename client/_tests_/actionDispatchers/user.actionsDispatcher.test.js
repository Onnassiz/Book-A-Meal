import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as userActionsDispatcher from '../../src/reducer/user/actionsDispatcher';
import LocalStorageMock from '../mocks/localStorage';

const middleware = [thunk];

const mockStore = configureMockStore(middleware);
const store = mockStore({});
const mock = new MockAdapter(axios);
axios.defaults.baseURL = 'http://localhost:3009/';

global.localStorage = new LocalStorageMock();
jest.useFakeTimers();

describe('Set User Actions', () => {
  beforeEach(() => { // Runs before each test in the suite
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  test('Post user and dispatch the correct actions before and after', () => {
    const response = {
      id: '2794fddd-14f3-4ec9-a1dc-88ad2bc649da',
      fullName: 'benjamin',
      role: 'admin',
      email: 'benjamin@gmail.com',
      token: 'this is a token',
    };

    mock.onPost('api/v1/auth/signUp').reply(201, response);

    const expectedActions = [
      {
        type: 'SET_LOADING',
      },
      {
        type: 'UNSET_LOADING',
      },
    ];

    store.dispatch(userActionsDispatcher.postUser({})).then(() => {
      jest.runAllTimers();
      expect(store.getActions()).toEqual(expectedActions);
      expect(localStorage.getItem('id')).toEqual('2794fddd-14f3-4ec9-a1dc-88ad2bc649da');
      expect(localStorage.getItem('email')).toEqual('benjamin@gmail.com');
      expect(localStorage.getItem('role')).toEqual('admin');
      expect(localStorage.getItem('token')).toEqual('this is a token');
      expect(localStorage.getItem('name')).toEqual('benjamin');
      expect(setTimeout).toHaveBeenCalledTimes(1);
    });
  });

  test('Post user and dispatch the correct actions before and after an error occurs', () => {
    const response = {
      message: 'Email already exist',
    };

    mock.onPost('api/v1/auth/signUp').reply(400, response);

    const expectedActions = [
      {
        type: 'SET_LOADING',
      },
      {
        type: 'SET_SIGN_UP_SERVER_ERRORS',
        errors: response,
      },
      {
        type: 'UNSET_LOADING',
      },
    ];

    store.dispatch(userActionsDispatcher.postUser({})).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('Sign in user and dispatch the correct actions before and after', () => {
    const response = {
      id: '2794fddd-14f3-4ec9-a1dc-88ad2bc649da',
      fullName: 'benjamin',
      role: 'admin',
      email: 'benjamin@gmail.com',
      token: 'this is a token',
    };

    mock.onPost('api/v1/auth/signIn').reply(201, response);

    const expectedActions = [
      {
        type: 'SET_LOADING',
      },
      {
        type: 'UNSET_LOADING',
      },
    ];

    store.dispatch(userActionsDispatcher.signInUser({})).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(localStorage.getItem('id')).toEqual('2794fddd-14f3-4ec9-a1dc-88ad2bc649da');
      expect(localStorage.getItem('email')).toEqual('benjamin@gmail.com');
      expect(localStorage.getItem('role')).toEqual('admin');
      expect(localStorage.getItem('token')).toEqual('this is a token');
      expect(localStorage.getItem('name')).toEqual('benjamin');
    });
  });

  test('Sign in user and dispatch the correct actions before and after an error occurs', () => {
    const response = {
      message: 'User not found',
    };

    mock.onPost('api/v1/auth/signIn').reply(400, response);

    const expectedActions = [
      {
        type: 'SET_LOADING',
      },
      {
        type: 'SET_SIGN_IN_SERVER_ERRORS',
        errors: response,
      },
      {
        type: 'UNSET_LOADING',
      },
    ];

    store.dispatch(userActionsDispatcher.signInUser({})).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

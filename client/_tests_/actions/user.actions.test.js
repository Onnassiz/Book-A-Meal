import configureStore from 'redux-mock-store';
import * as userActions from '../../src/reducer/user/actions';

const mockStore = configureStore();
const store = mockStore();

describe('Set User Actions', () => {
  beforeEach(() => { // Runs before each test in the suite
    store.clearActions();
  });

  test('Dispatches the correct action and user', () => {
    const user = {
      type: 'SET_USER',
      id: '3243',
      name: 'benjamin',
      role: 'admin',
      email: 'benjamin@gmail.com',
    };
    const expectedActions = [
      {
        type: 'SET_USER',
        id: '3243',
        name: 'benjamin',
        role: 'admin',
        email: 'benjamin@gmail.com',
      },
    ];

    store.dispatch(userActions.setUserAction(user));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('Dispatches the correct action and sign up errors', () => {
    const errors = {
      message: 'Email already exist',
    };
    const expectedActions = [
      {
        type: 'SET_SIGN_UP_SERVER_ERRORS',
        errors,
      },
    ];
    store.dispatch(userActions.setSignUpErrorsAction(errors));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('Dispatches the correct action and sign in errors', () => {
    const errors = {
      message: 'User not found',
    };
    const expectedActions = [
      {
        type: 'SET_SIGN_IN_SERVER_ERRORS',
        errors,
      },
    ];
    store.dispatch(userActions.setSignInErrorsAction(errors));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

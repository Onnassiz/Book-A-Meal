import userReducers from '../../src/reducer/user';
import {
  SET_USER,
  SET_SIGN_UP_SERVER_ERRORS,
  SET_SIGN_IN_SERVER_ERRORS,
} from '../../src/reducer/user/actions';

describe('User Reducers', () => {
  test('Initial State', () => {
    const action = { type: 'INVALID_ACTION' };
    const initialState = {};

    expect(userReducers(undefined, action)).toEqual(initialState);
  });

  test('Set User', () => {
    const action = {
      type: SET_USER,
      id: '123',
      name: 'Benjamin',
      email: 'whoKnows@gmail.com',
      role: 'caterer',
    };

    const expectedState = {
      id: '123',
      name: 'Benjamin',
      email: 'whoKnows@gmail.com',
      role: 'caterer',
    };

    expect(userReducers(undefined, action)).toEqual(expectedState);
  });

  test('Set Sign Up Errors', () => {
    const action = {
      type: SET_SIGN_UP_SERVER_ERRORS,
      errors: {
        email: 'Email must be unique',
      },
    };

    const expectedState = {
      signUpErrors: {
        email: 'Email must be unique',
      },
    };

    expect(userReducers(undefined, action)).toEqual(expectedState);
  });

  test('Set Sign In Errors', () => {
    const action = {
      type: SET_SIGN_IN_SERVER_ERRORS,
      errors: {
        message: 'User not found',
      },
    };

    const expectedState = {
      signInErrors: {
        message: 'User not found',
      },
    };

    expect(userReducers(undefined, action)).toEqual(expectedState);
  });
});

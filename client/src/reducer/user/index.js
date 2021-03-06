import { SET_USER, SET_SIGN_UP_SERVER_ERRORS, SET_SIGN_IN_SERVER_ERRORS } from './actions';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        id: action.id, name: action.name, email: action.email, role: action.role,
      };
    case SET_SIGN_UP_SERVER_ERRORS:
      return { signUpErrors: action.errors };
    case SET_SIGN_IN_SERVER_ERRORS:
      return { signInErrors: action.errors };
    default:
      return state;
  }
};

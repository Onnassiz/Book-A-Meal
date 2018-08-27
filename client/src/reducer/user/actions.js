export const SET_USER = 'SET_USER';
export const SET_SIGN_UP_SERVER_ERRORS = 'SET_SIGN_UP_SERVER_ERRORS';
export const SET_SIGN_IN_SERVER_ERRORS = 'SET_SIGN_IN_SERVER_ERRORS';

export const setUserAction = user => ({
  type: SET_USER,
  id: user.id,
  name: user.name,
  role: user.role,
  email: user.email,
});

export const setSignUpErrorsAction = errors => ({
  type: SET_SIGN_UP_SERVER_ERRORS,
  errors,
});

export const setSignInErrorsAction = errors => ({
  type: SET_SIGN_IN_SERVER_ERRORS,
  errors,
});

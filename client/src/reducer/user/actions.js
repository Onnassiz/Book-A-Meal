import axios from 'axios';
import { setLoading, unsetLoading } from '../formState/actions';

export const SET_USER = 'SET_USER';
export const SET_SIGN_UP_SERVER_ERRORS = 'SET_SIGN_UP_SERVER_ERRORS';
export const SET_SIGN_IN_SERVER_ERRORS = 'SET_SIGN_IN_SERVER_ERRORS';

export function setUser(user) {
  return dispatch => dispatch({
    type: SET_USER,
    id: user.id,
    name: user.name,
    role: user.role,
    email: user.email,
  });
}

const setSignUpErrors = errors => dispatch => dispatch({
  type: SET_SIGN_UP_SERVER_ERRORS,
  errors,
});

const setSignInErrors = errors => dispatch => dispatch({
  type: SET_SIGN_IN_SERVER_ERRORS,
  errors,
});

const processSignIn = (data) => {
  localStorage.setItem('id', data.id);
  localStorage.setItem('email', data.email);
  localStorage.setItem('name', data.fullName);
  localStorage.setItem('role', data.role);
  localStorage.setItem('token', data.token);
  setTimeout(() => {
    window.location = '/';
  }, 500);
};

export function postUser(user) {
  return (dispatch) => {
    dispatch(setLoading());
    axios.post('api/v1/auth/signUp', user).then((response) => {
      processSignIn(response.data);
    }).catch((error) => {
      dispatch(setSignUpErrors(error.response.data));
      dispatch(unsetLoading());
    });
  };
}


export function signInUser(user) {
  return (dispatch) => {
    dispatch(setLoading());
    axios.post('api/v1/auth/signIn', user).then((response) => {
      processSignIn(response.data);
    }).catch((error) => {
      dispatch(unsetLoading());
      dispatch(setSignInErrors(error.response.data));
    });
  };
}

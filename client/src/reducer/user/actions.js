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

function setSignUpErrors(errors) {
  return dispatch => dispatch({
    type: SET_SIGN_UP_SERVER_ERRORS,
    errors,
  });
}

function setSignInErrors(errors) {
  return dispatch => dispatch({
    type: SET_SIGN_IN_SERVER_ERRORS,
    errors,
  });
}

export function postUser(user) {
  return (dispatch) => {
    dispatch(setLoading());
    axios.post('api/v1/auth/signUp', user).then((response) => {
      localStorage.setItem('id', response.data.id);
      localStorage.setItem('email', response.data.email);
      localStorage.setItem('name', response.data.fullName);
      localStorage.setItem('role', response.data.role);
      localStorage.setItem('token', response.data.token);
      setTimeout(() => {
        window.location = '/';
      }, 500);
    }).catch((error) => {
      dispatch(unsetLoading());
      dispatch(setSignUpErrors(error.response.data));
    });
  };
}


export function signInUser(user) {
  return (dispatch) => {
    dispatch(setLoading());
    axios.post('api/v1/auth/signIn', user).then((response) => {
      localStorage.setItem('id', response.data.id);
      localStorage.setItem('email', response.data.email);
      localStorage.setItem('name', response.data.fullName);
      localStorage.setItem('role', response.data.role);
      localStorage.setItem('token', response.data.token);
      setTimeout(() => {
        window.location = '/';
      }, 500);
    }).catch((error) => {
      dispatch(unsetLoading());
      dispatch(setSignInErrors(error.response.data));
    });
  };
}

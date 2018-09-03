import axios from 'axios';
import { setLoading, unsetLoading } from '../formState/actionsDispatcher';
import { setUserAction, setSignUpErrorsAction, setSignInErrorsAction } from './actions';

export const setUser = user => dispatch => dispatch(setUserAction(user));

const setSignUpErrors = errors => dispatch => dispatch(setSignUpErrorsAction(errors));
const setSignInErrors = errors => dispatch => dispatch(setSignInErrorsAction(errors));

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

export const postUser = user => (dispatch) => {
  dispatch(setLoading());
  return axios.post('api/v1/auth/signUp', user).then((response) => {
    dispatch(unsetLoading());
    processSignIn(response.data);
  }).catch((error) => {
    dispatch(setSignUpErrors(error.response.data));
    dispatch(unsetLoading());
  });
};


export const signInUser = user => (dispatch) => {
  dispatch(setLoading());
  return axios.post('api/v1/auth/signIn', user).then((response) => {
    dispatch(unsetLoading());
    processSignIn(response.data);
  }).catch((error) => {
    dispatch(setSignInErrors(error.response.data));
    dispatch(unsetLoading());
  });
};

import axios from 'axios';
import { setLoading, unsetLoading } from '../formState/actionsDispatcher';
import { setMealErrorsAction } from './actions';

const setMealErrors = errors => dispatch => dispatch(setMealErrorsAction(errors));

export const postMeal = meal => (dispatch) => {
  dispatch(setLoading());
  return axios.post('api/v1/meals', meal).then((response) => {
    dispatch(unsetLoading());
    return response;
  }).catch((error) => {
    dispatch(unsetLoading());
    dispatch(setMealErrors(error.response.data));
    return error;
  });
};

export const updateMeal = meal => (dispatch) => {
  dispatch(setLoading());
  return axios.put(`api/v1/meals/${meal.id}`, meal).then((response) => {
    dispatch(unsetLoading());
    return response;
  }).catch((error) => {
    dispatch(unsetLoading());
    dispatch(setMealErrors(error.response.data));
    return error;
  });
};

export const deleteMealById = id => (dispatch) => {
  dispatch(setLoading());
  return axios.delete(`api/v1/meals/${id}`).then((response) => {
    dispatch(unsetLoading());
    return response;
  }).catch((error) => {
    dispatch(unsetLoading());
    dispatch(setMealErrors(error.response.data));
    return error;
  });
};

export const getMeals = (limit = 10, offset = 0) => (dispatch) => {
  dispatch(setLoading());
  return axios.get(`api/v1/meals/?limit=${limit}&offset=${offset}`).then((response) => {
    dispatch(unsetLoading());
    return response;
  }).catch((error) => {
    dispatch(unsetLoading());
    dispatch(setMealErrors(error.response.data));
    return error;
  });
};

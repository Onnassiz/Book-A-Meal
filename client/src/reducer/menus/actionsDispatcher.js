import axios from 'axios';
import { setLoading, unsetLoading } from '../formState/actionsDispatcher';
import { setMenusErrorsAction } from './actions';

const setMenusErrors = errors => dispatch => dispatch(setMenusErrorsAction(errors));

export const getUserMenus = (offset = 0) => (dispatch) => {
  dispatch(setLoading());
  return axios.get(`api/v1/menus/user/?offset=${offset}`).then((response) => {
    dispatch(unsetLoading());
    return response;
  }).catch((error) => {
    dispatch(unsetLoading());
    dispatch(setMenusErrors(error.response.data));
    return error;
  });
};

export const getMealsInMenu = (data, offset = 0, getAll = false) => {
  const menu = data;
  const url = getAll ? `${menu.meals}?offset=${offset}` : `${menu.meals}?offset=${offset}&limit=5`;
  return (dispatch) => {
    dispatch(setLoading());
    return axios.get(url).then((response) => {
      dispatch(unsetLoading());
      menu.mealsArray = menu.mealsArray.concat(response.data);
      return { response, menu };
    }).catch((error) => {
      dispatch(unsetLoading());
      dispatch(setMenusErrors(error.response.data));
      return error;
    });
  };
};


export const postMenu = menu => (dispatch) => {
  dispatch(setLoading());
  return axios.post('api/v1/menus', menu).then((response) => {
    dispatch(unsetLoading());
    return response;
  }).catch((error) => {
    dispatch(unsetLoading());
    dispatch(setMenusErrors(error.response.data));
    return error;
  });
};

export const deleteMenuById = id => (dispatch) => {
  dispatch(setLoading());
  return axios.delete(`api/v1/menus/${id}`).then((response) => {
    dispatch(unsetLoading());
    return response;
  }).catch((error) => {
    dispatch(unsetLoading());
    dispatch(setMenusErrors(error.response.data));
    return error;
  });
};

export const updateMenu = menu => (dispatch) => {
  dispatch(setLoading());
  return axios.put(`api/v1/menus/${menu.id}`, menu)
    .then((response) => {
      dispatch(unsetLoading());
      return response;
    }).catch((error) => {
      dispatch(unsetLoading());
      dispatch(setMenusErrors(error.response.data));
      return error;
    });
};

export const getMealsInDailyMenu = (date, offset = 0, limit = 12) => (dispatch) => {
  dispatch(setLoading());
  return axios.get(`api/v1/meals/menus/?date=${date}&offset=${offset}&limit=${limit}`).then((response) => {
    dispatch(unsetLoading());
    return response;
  }).catch((error) => {
    dispatch(unsetLoading());
    dispatch(setMenusErrors(error.response.data));
    return error;
  });
};

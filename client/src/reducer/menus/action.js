import axios from 'axios';
import { setLoading, unsetLoading } from '../formState/action';

export const SET_MENUS = 'SET_MENUS';
export const SET_USER_MENUS = 'SET_USER_MENUS';
export const SET_MENUS_SERVER_ERRORS = 'SET_MENUS_SERVER_ERRORS';
export const SET_MENUS_ALERT = 'SET_MENUS_ALERT';

function setAlert(alert) {
  return dispatch => dispatch({
    type: SET_MENUS_ALERT,
    alert,
  });
}

export function setMenus(storeMenus, menu) {
  const menus = [menu].concat(storeMenus);
  return dispatch => dispatch({
    type: SET_MENUS,
    menus,
  });
}

function setMenusErrors(errors) {
  return dispatch => dispatch({
    type: SET_MENUS_SERVER_ERRORS,
    errors,
  });
}

function setMenusArray(storeMenus, menu) {
  const menus = storeMenus.concat(menu);
  return dispatch => dispatch({
    type: SET_MENUS,
    menus,
  });
}

function updateMenuAfterDelete(storeMenus, id) {
  const menus = storeMenus.filter(x => x.id !== id);
  return dispatch => dispatch({
    type: SET_MENUS,
    menus,
  });
}

export function updateMenuState(storeMenus, menu) {
  const index = storeMenus.findIndex(x => x.id === menu.id);
  const menus = storeMenus;
  menus[index] = menu;
  return dispatch => dispatch({
    type: SET_MENUS,
    menus,
  });
}

export function setClientMenus(menus, date) {
  return dispatch => dispatch({
    type: SET_USER_MENUS,
    menus,
    date,
  });
}

function addMealsFromMenuToArray(menus) {
  const meals = [];
  menus.forEach((item) => {
    item.meals.forEach((meal) => {
      meals.push({
        id: meal.id,
        name: meal.name,
        menuName: item.name,
        category: meal.category,
        description: meal.description,
        caterer: item.caterer,
        profileId: item.profileId,
        price: meal.price,
        totalPrice: meal.price,
        units: 1,
        menuId: item.id,
        imageUrl: meal.imageUrl,
      });
    });
  });
  return meals;
}

export function getUserMenus() {
  return (dispatch, getState) => {
    dispatch(setLoading());
    return axios.get('api/v1/menus/user').then((response) => {
      dispatch(unsetLoading());
      dispatch(setMenusArray(getState().menus.menus, response.data));
      return response;
    }).catch((error) => {
      dispatch(unsetLoading());
      // console.log(error.response.data);
      return error;
    });
  };
}


export function postMenu(menu) {
  return (dispatch, getState) => {
    dispatch(setLoading());
    return axios.post('api/v1/menus', menu).then((response) => {
      dispatch(unsetLoading());
      dispatch(setMenus(getState().menus.menus, response.data.menu));
      dispatch(setAlert('Menu successfully created'));
      return response;
    }).catch((error) => {
      dispatch(unsetLoading());
      dispatch(setMenusErrors(error.response));
      return error;
    });
  };
}

export function deleteMenuById(id) {
  return (dispatch, getState) => {
    dispatch(setLoading());
    return axios.delete(`api/v1/menus/${id}`).then((response) => {
      dispatch(unsetLoading());
      dispatch(updateMenuAfterDelete(getState().menus.menus, id));
      dispatch(setAlert('Meal successfully deleted'));
      return response;
    }).catch((error) => {
      dispatch(unsetLoading());
      dispatch(setMenusErrors(error.response.data));
      return error;
    });
  };
}

export function updateMenu(meal) {
  return (dispatch, getState) => {
    dispatch(setLoading());
    return axios.put(`api/v1/menus/${meal.id}`, meal).then((response) => {
      dispatch(unsetLoading());
      dispatch(updateMenuState(getState().menus.menus, response.data.menu));
      dispatch(setAlert('Menu successfully updated'));
      return response;
    }).catch((error) => {
      dispatch(unsetLoading());
      dispatch(setMenusErrors(error.response.data));
      return error;
    });
  };
}

export function getMenusByUnixTime(date) {
  let unixTime = new Date(date);
  unixTime = unixTime.setDate(unixTime.getDate()) / 1000;
  return (dispatch) => {
    dispatch(setLoading());
    return axios.get(`api/v1/menus/unixTime/${unixTime}`).then((response) => {
      dispatch(unsetLoading());
      dispatch(setClientMenus(addMealsFromMenuToArray(response.data), date));
      return response;
    }).catch((error) => {
      dispatch(unsetLoading());
      dispatch(setClientMenus([], date));
      return error;
    });
  };
}

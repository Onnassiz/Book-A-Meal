import axios from 'axios';
import { setLoading, unsetLoading } from '../formState/actions';

export const SET_MENUS = 'SET_MENUS';
export const SET_USER_MENUS = 'SET_USER_MENUS';
export const SET_MENUS_SERVER_ERRORS = 'SET_MENUS_SERVER_ERRORS';
export const SET_MENUS_ALERT = 'SET_MENUS_ALERT';
export const SET_MENUS_COUNT = 'SET_MENUS_COUNT';
export const SET_MENUS_AND_COUNT = 'SET_MENUS_AND_COUNT';

function setAlert(alert) {
  return dispatch => dispatch({
    type: SET_MENUS_ALERT,
    alert,
  });
}

// function sortMenu(c, d) {
//   const a = c.date;
//   const b = d.date;
//   if (a > b) return -1;
//   if (a < b) return 1;
//   return 0;
// }

export function setMenus(storeMenus, newMenus) {
  const menus = newMenus.concat(storeMenus);
  return dispatch => dispatch({
    type: SET_MENUS,
    menus,
  });
}

export function setMenusCount(count) {
  return dispatch => dispatch({
    type: SET_MENUS_COUNT,
    count,
  });
}

function setMenusErrors(errors) {
  return dispatch => dispatch({
    type: SET_MENUS_SERVER_ERRORS,
    errors,
  });
}

// function setMenusArray(storeMenus, menus, pageNumber) {
//   const menusArray = storeMenus.menus.concat(menus.menus);
//   const { fetchedPages } = storeMenus;
//   fetchedPages.push({
//     page: pageNumber,
//     startId: menus.menus[0].id,
//   });
//   return dispatch => dispatch({
//     type: SET_MENUS_AND_COUNT,
//     menus: menusArray.sort(sortMenu),
//     count: menus.count,
//     fetchedPages,
//   });
// }

// function updateMenuAfterDelete(storeMenus, id) {
//   const menus = storeMenus.filter(x => x.id !== id);
//   return dispatch => dispatch({
//     type: SET_MENUS,
//     menus,
//   });
// }

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

export function getUserMenus(offset = 0) {
  return (dispatch) => {
    dispatch(setLoading());
    return axios.get(`api/v1/menus/user/?offset=${offset}`).then((response) => {
      dispatch(unsetLoading());
      return response;
    }).catch((error) => {
      dispatch(unsetLoading());
      return error;
    });
  };
}

export function getMealsInMenu(data, offset = 0) {
  const menu = data;
  return (dispatch) => {
    dispatch(setLoading());
    return axios.get(`${menu.meals}?offset=${offset}&limit=5`).then((response) => {
      dispatch(unsetLoading());
      menu.mealsArray = menu.mealsArray.concat(response.data);
      // dispatch(updateMenuState(getState().menus.menus, menu));
      return { response, menu };
    }).catch((error) => {
      dispatch(unsetLoading());
      return error;
    });
  };
}


export function postMenu(menu) {
  return (dispatch) => {
    dispatch(setLoading());
    return axios.post('api/v1/menus', menu).then((response) => {
      dispatch(unsetLoading());
      // dispatch(setMenus(getState().menus.menus, response.data.menus));
      // dispatch(setMenusCount(getState().menus.count + response.data.menus.length));
      dispatch(setAlert('Menu successfully created'));
      return response;
    }).catch((error) => {
      dispatch(unsetLoading());
      dispatch(setMenusErrors(error.response.data));
      return error;
    });
  };
}

export function deleteMenuById(id) {
  return (dispatch) => {
    dispatch(setLoading());
    return axios.delete(`api/v1/menus/${id}`).then((response) => {
      dispatch(unsetLoading());
      // dispatch(updateMenuAfterDelete(getState().menus.menus, id));
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
  return (dispatch) => {
    dispatch(setLoading());
    return axios.put(`api/v1/menus/${meal.id}`, meal).then((response) => {
      dispatch(unsetLoading());
      // dispatch(updateMenuState(getState().menus.menus, response.data.menu));
      dispatch(setAlert('Menu successfully updated'));
      return response;
    }).catch((error) => {
      dispatch(unsetLoading());
      dispatch(setMenusErrors(error.response.data));
      return error;
    });
  };
}

export function getMealsInDailyMenu(date, offset = 0, limit = 12) {
  return (dispatch) => {
    dispatch(setLoading());
    return axios.get(`api/v1/meals/menus/?date=${date}&offset=${offset}&limit=${limit}`).then((response) => {
      dispatch(unsetLoading());
      // dispatch(setClientMenus(addMealsFromMenuToArray(response.data), date));
      return response;
    }).catch((error) => {
      dispatch(unsetLoading());
      dispatch(setClientMenus([], date));
      return error;
    });
  };
}

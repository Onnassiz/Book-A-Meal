import axios from 'axios';
import { store } from '../../store';
import { setLoading, unsetLoading } from '../formState/action';

export const SET_MENUS = 'SET_MENUS';
export const SET_MENUS_SERVER_ERRORS = 'SET_MENUS_SERVER_ERRORS';
export const SET_MENUS_ALERT = 'SET_MENUS_ALERT';

function setAlert(alert) {
	return dispatch => dispatch({
		type: SET_MENUS_ALERT,
		alert,
	});
}

export function setMenus(menu) {
	let { menus } = store.getState().menus;
	menus = [menu].concat(menus);
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

function setMenusArray(menu) {
	let { menus } = store.getState().menus;
	menus = menus.concat(menu);
	return dispatch => dispatch({
		type: SET_MENUS,
		menus,
	});
}

function updateMenuAfterDelete(id) {
	let { menus } = store.getState().menus;
	menus = menus.filter(x => x.id !== id);
	return dispatch => dispatch({
		type: SET_MENUS,
		menus,
	});
}

export function updateMenuState(menu) {
	const { menus } = store.getState().menus;
	const index = menus.findIndex(x => x.id === menu.id);
	menus[index] = menu;
	return dispatch => dispatch({
		type: SET_MENUS,
		menus,
	});
}

export function getUserMenus() {
	return (dispatch) => {
		dispatch(setLoading());
		return axios.get('api/v1/menus/user').then((response) => {
			dispatch(unsetLoading());
			dispatch(setMenusArray(response.data));
			return response;
		}).catch((error) => {
			dispatch(unsetLoading());
			// console.log(error.response.data);
			return error;
		});
	};
}


export function postMenu(menu) {
	return (dispatch) => {
		dispatch(setLoading());
		return axios.post('api/v1/menus', menu).then((response) => {
			dispatch(unsetLoading());
			dispatch(setMenus(response.data.menu));
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
	return (dispatch) => {
		dispatch(setLoading());
		return axios.delete(`api/v1/menus/${id}`).then((response) => {
			dispatch(unsetLoading());
			dispatch(updateMenuAfterDelete(id));
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
			dispatch(updateMenuState(response.data.menu));
			dispatch(setAlert('Menu successfully updated'));
			return response;
		}).catch((error) => {
			dispatch(unsetLoading());
			dispatch(setMenusErrors(error.response.data));
			return error;
		});
	};
}

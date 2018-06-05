import axios from 'axios';
import { store } from '../../store';
import { setLoading, unsetLoading } from '../formState/action';

export const SET_MENUS = 'SET_MENUS';
export const SET_MENUS_SERVER_ERRORS = 'SET_MENUS_SERVER_ERRORS';
export const SET_MENU_ALERT = 'SET_MENU_ALERT';

function setAlert(alert) {
	return dispatch => dispatch({
		type: SET_MENU_ALERT,
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


export function postMenus(meal) {
	return (dispatch) => {
		dispatch(setLoading());
		return axios.post('api/v1/menus', meal).then((response) => {
			dispatch(unsetLoading());
			dispatch(setMenus(response.data));
			dispatch(setAlert('Meal successfully created'));
			return response;
		}).catch((error) => {
			dispatch(unsetLoading());
			dispatch(setMenusErrors(error.response));
			return error;
		});
	};
}

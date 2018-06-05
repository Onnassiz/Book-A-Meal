import axios from 'axios';
import { store } from '../../store';
import { setLoading, unsetLoading } from '../formState/action';

export const SET_MEAL = 'SET_MEAL';
export const SET_MEAL_SERVER_ERRORS = 'SET_MEAL_SERVER_ERRORS';
export const SET_MEAL_ALERT = 'SET_MEAL_ALERT';

function setAlert(alert) {
	return dispatch => dispatch({
		type: SET_MEAL_ALERT,
		alert,
	});
}

export function setMeal(meal) {
	let { meals } = store.getState().meals;
	meals = [meal].concat(meals);
	return dispatch => dispatch({
		type: SET_MEAL,
		meals,
	});
}

export function setMealArray(meal) {
	let { meals } = store.getState().meals;
	meals = meals.concat(meal);
	return dispatch => dispatch({
		type: SET_MEAL,
		meals,
	});
}

export function updateMealState(meal) {
	const { meals } = store.getState().meals;
	const index = meals.findIndex(x => x.id === meal.id);
	meals[index] = meal;
	return dispatch => dispatch({
		type: SET_MEAL,
		meals,
	});
}

export function updateMealAfterDelete(id) {
	let { meals } = store.getState().meals;
	meals = meals.filter(x => x.id !== id);
	return dispatch => dispatch({
		type: SET_MEAL,
		meals,
	});
}

function setMealErrors(errors) {
	return dispatch => dispatch({
		type: SET_MEAL_SERVER_ERRORS,
		errors,
	});
}

export function postMeal(meal) {
	return (dispatch) => {
		dispatch(setLoading());
		return axios.post('api/v1/meals', meal).then((response) => {
			dispatch(unsetLoading());
			dispatch(setMeal(response.data));
			dispatch(setAlert('Meal successfully created'));
			return response;
		}).catch((error) => {
			dispatch(unsetLoading());
			dispatch(setMealErrors(error.response));
			return error;
		});
	};
}

export function updateMeal(meal) {
	return (dispatch) => {
		dispatch(setLoading());
		return axios.put(`api/v1/meals/${meal.id}`, meal).then((response) => {
			dispatch(unsetLoading());
			dispatch(updateMealState(response.data));
			dispatch(setAlert('Meal successfully updated'));
			return response;
		}).catch((error) => {
			dispatch(unsetLoading());
			dispatch(setMealErrors(error.response.data));
			return error;
		});
	};
}

export function deleteMealById(id) {
	return (dispatch) => {
		dispatch(setLoading());
		return axios.delete(`api/v1/meals/${id}`).then((response) => {
			dispatch(unsetLoading());
			dispatch(updateMealAfterDelete(id));
			dispatch(setAlert('Meal successfully deleted'));
			return response;
		}).catch((error) => {
			dispatch(unsetLoading());
			dispatch(setMealErrors(error.response.data));
			return error;
		});
	};
}

export function putImage(id, field) {
	return (dispatch) => {
		dispatch(setLoading());
		return axios.put(`api/v1/meals/image/${id}`, field).then((response) => {
			dispatch(unsetLoading());
			dispatch(updateMealState(response.data));
			dispatch(setAlert('Image successfully uploaded'));
			return response;
		}).catch((error) => {
			dispatch(unsetLoading());
			dispatch(setMealErrors(error.response.data));
			return error;
		});
	};
}
export function getMeals() {
	return (dispatch) => {
		dispatch(setLoading());
		return axios.get('api/v1/meals').then((response) => {
			dispatch(unsetLoading());
			dispatch(setMealArray(response.data));
			return response;
		}).catch((error) => {
			dispatch(unsetLoading());
			return error;
		});
	};
}

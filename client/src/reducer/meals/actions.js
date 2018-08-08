import axios from 'axios';
import { setLoading, unsetLoading } from '../formState/actions';

export const SET_MEAL = 'SET_MEAL';
export const SET_MEAL_SERVER_ERRORS = 'SET_MEAL_SERVER_ERRORS';
export const SET_MEAL_ALERT = 'SET_MEAL_ALERT';

function setAlert(alert) {
  return dispatch => dispatch({
    type: SET_MEAL_ALERT,
    alert,
  });
}

// function setMeal(storeMeals, meal) {
//   const meals = [meal].concat(storeMeals);
//   return dispatch => dispatch({
//     type: SET_MEAL,
//     meals,
//   });
// }

// function setMealArray(storeMeals, meal) {
//   const meals = storeMeals.concat(meal);
//   return dispatch => dispatch({
//     type: SET_MEAL,
//     meals,
//   });
// }

export function updateMealState(storeMeals, meal) {
  const index = storeMeals.findIndex(x => x.id === meal.id);
  const meals = storeMeals;
  meals[index] = meal;
  return dispatch => dispatch({
    type: SET_MEAL,
    meals,
  });
}

export function updateMealAfterDelete(storeMeals, id) {
  const meals = storeMeals.filter(x => x.id !== id);
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
      // dispatch(setMeal(getState().meals.meals, response.data));
      dispatch(setAlert('Meal successfully created'));
      return response;
    }).catch((error) => {
      dispatch(unsetLoading());
      dispatch(setMealErrors(error.response.data));
      return error;
    });
  };
}

export function updateMeal(meal) {
  return (dispatch) => {
    dispatch(setLoading());
    return axios.put(`api/v1/meals/${meal.id}`, meal).then((response) => {
      dispatch(unsetLoading());
      // dispatch(updateMealState(getState().meals.meals, response.data));
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
      // dispatch(updateMealAfterDelete(getState().meals.meals, id));
      return response;
    }).catch((error) => {
      dispatch(unsetLoading());
      dispatch(setMealErrors(error.response.data));
      return error;
    });
  };
}

export function getMeals(limit = 10, offset = 0) {
  return (dispatch) => {
    dispatch(setLoading());
    return axios.get(`api/v1/meals/?limit=${limit}&offset=${offset}`).then((response) => {
      dispatch(unsetLoading());
      // dispatch(setMealArray(getState().meals.meals, response.data));
      return response;
    }).catch((error) => {
      dispatch(unsetLoading());
      return error;
    });
  };
}

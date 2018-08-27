export const SET_MEAL_SERVER_ERRORS = 'SET_MEAL_SERVER_ERRORS';

export const setMealErrorsAction = errors => ({
  type: SET_MEAL_SERVER_ERRORS,
  errors,
});

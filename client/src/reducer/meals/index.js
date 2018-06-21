import { SET_MEAL, SET_MEAL_ALERT, SET_MEAL_SERVER_ERRORS } from './action';

const initialState = {
	meals: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
	case SET_MEAL:
		return { ...state, meals: action.meals };
	case SET_MEAL_SERVER_ERRORS:
		return { ...state, errors: action.errors };
	case SET_MEAL_ALERT:
		return { ...state, alert: action.alert };
	default:
		return state;
	}
};

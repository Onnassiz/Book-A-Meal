import { SET_MENUS, SET_MENUS_ALERT, SET_MENUS_SERVER_ERRORS } from './action';

const initialState = {
	menus: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
	case SET_MENUS:
		return { ...state, menus: action.menus };
	case SET_MENUS_SERVER_ERRORS:
		return { ...state, errors: action.errors.data };
	case SET_MENUS_ALERT:
		return { ...state, alert: action.alert };
	default:
		return state;
	}
};

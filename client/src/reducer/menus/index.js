import { SET_MENUS, SET_MENUS_ALERT, SET_MENU_SERVER_ERRORS } from './action';

const initialState = {
	menus: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
	case SET_MENUS:
		return { ...state, menus: action.menus };
	case SET_MENU_SERVER_ERRORS:
		return { errors: action.errors };
	case SET_MENUS_ALERT:
		return { ...state, alert: action.alert };
	default:
		return state;
	}
};

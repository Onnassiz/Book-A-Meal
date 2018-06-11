import { combineReducers } from 'redux';
import formState from './formState';
import user from './user';
import profile from './profile';
import meals from './meals';
import menus from './menus';

export default combineReducers({
	formState,
	meals,
	menus,
	user,
	profile,
});

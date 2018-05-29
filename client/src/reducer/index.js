import { combineReducers } from 'redux';
import formState from './formState';
import user from './user';
import profile from './profile';
import meals from './meals';

export default combineReducers({
	formState,
	meals,
	user,
	profile,
});

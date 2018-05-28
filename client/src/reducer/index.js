import { combineReducers } from 'redux';
import formState from './formState';
import user from './user';
import profile from './profile';

export default combineReducers({
	formState,
	user,
	profile,
});

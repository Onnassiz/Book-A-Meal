import { combineReducers } from 'redux';
import formState from './formState';
import user from './user';

export default combineReducers({
	formState,
	user,
});

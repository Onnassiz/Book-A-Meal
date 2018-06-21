import { combineReducers } from 'redux';
import formState from './formState';
import user from './user';
import profile from './profile';
import meals from './meals';
import menus from './menus';
import cart from './cart';

export default combineReducers({
  formState,
  meals,
  menus,
  user,
  profile,
  cart,
});

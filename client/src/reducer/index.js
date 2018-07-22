import { combineReducers } from 'redux';
import formState from './formState';
import user from './user';
import profile from './profile';
import meals from './meals';
import menus from './menus';
import orders from './orders';
import cart from './cart';

export default combineReducers({
  formState,
  meals,
  menus,
  orders,
  user,
  profile,
  cart,
});

import { SET_MENUS, SET_MENUS_SERVER_ERRORS, SET_USER_MENUS, SET_MENUS_COUNT, SET_MENUS_AND_COUNT } from './actions';
import { getCurrentDate } from '../../utilities/functions';

const initialState = {
  menus: [],
  count: 0,
  fetchedPages: [],
  userMenus: [],
  currentDate: getCurrentDate(),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MENUS:
      return { ...state, menus: action.menus };
    case SET_MENUS_AND_COUNT:
      return {
        ...state, menus: action.menus, count: action.count, fetchedPages: action.fetchedPages,
      };
    case SET_USER_MENUS:
      return { ...state, userMenus: action.menus, currentDate: action.date };
    case SET_MENUS_SERVER_ERRORS:
      return { ...state, errors: action.errors };
    case SET_MENUS_COUNT:
      return { ...state, count: action.count };
    default:
      return state;
  }
};

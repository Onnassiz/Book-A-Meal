import { SET_MENUS_SERVER_ERRORS } from './actions';
import { getCurrentDate } from '../../utilities/functions';

const initialState = {
  currentDate: getCurrentDate(),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MENUS_SERVER_ERRORS:
      return { ...state, errors: action.errors };
    default:
      return state;
  }
};

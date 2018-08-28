import { SET_MEAL_SERVER_ERRORS } from './actions';

const initialState = {
  meals: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MEAL_SERVER_ERRORS:
      return { ...state, errors: action.errors };
    default:
      return state;
  }
};

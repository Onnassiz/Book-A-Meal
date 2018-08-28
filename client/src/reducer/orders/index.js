import { SET_UPDATED_ORDER, SET_ORDER_SERVER_ERRORS } from './actions';

const initialState = {
  updatedOrder: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_UPDATED_ORDER:
      return { ...state, updatedOrder: action.order };
    case SET_ORDER_SERVER_ERRORS:
      return { ...state, errors: action.errors };
    default:
      return state;
  }
};


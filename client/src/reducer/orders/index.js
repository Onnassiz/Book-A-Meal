import { SET_ORDERS, SET_ORDER_SERVER_ERRORS, SET_ORDERS_ALERT } from './actions';

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return { ...state, orders: action.orders };
    case SET_ORDER_SERVER_ERRORS:
      return { ...state, errors: action.errors };
    case SET_ORDERS_ALERT:
      return { ...state, alert: action.alert };
    default:
      return state;
  }
};


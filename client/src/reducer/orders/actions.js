import axios from 'axios';
import { setLoading, unsetLoading } from '../formState/actions';

export const SET_ORDERS = 'SET_ORDERS';
export const SET_USER_ORDERS = 'SET_USER_ORDERS';
export const SET_ORDER_SERVER_ERRORS = 'SET_ORDER_SERVER_ERRORS';
export const SET_ORDERS_ALERT = 'SET_ORDERS_ALERT';

function setAlert(alert) {
  return dispatch => dispatch({
    type: SET_ORDERS_ALERT,
    alert,
  });
}

function setOrdersErrors(errors) {
  return dispatch => dispatch({
    type: SET_ORDER_SERVER_ERRORS,
    errors,
  });
}

export function setOrders(storeOrders, menu) {
  const orders = [menu].concat(storeOrders);
  return dispatch => dispatch({
    type: SET_ORDERS,
    orders,
  });
}

export function postOrder(order) {
  return (dispatch, getState) => {
    dispatch(setLoading());
    return axios.post('api/v1/orders', order).then((response) => {
      dispatch(unsetLoading());
      dispatch(setOrders(getState().orders.orders, response.data.order));
      dispatch(setAlert('Your order have been placed. Expect delivery shortly.'));
      return response;
    }).catch((error) => {
      dispatch(unsetLoading());
      dispatch(setOrdersErrors(error.response.data));
      return error;
    });
  };
}

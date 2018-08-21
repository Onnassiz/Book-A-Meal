import axios from 'axios';
import { setLoading, unsetLoading } from '../formState/actions';

export const SET_UPDATED_ORDER = 'SET_UPDATED_ORDER';
export const SET_USER_ORDERS = 'SET_USER_ORDERS';
export const SET_ORDER_SERVER_ERRORS = 'SET_ORDER_SERVER_ERRORS';
export const SET_ORDERS_ALERT = 'SET_ORDERS_ALERT';

function setOrdersErrors(errors) {
  return dispatch => dispatch({
    type: SET_ORDER_SERVER_ERRORS,
    errors,
  });
}

export function setUpdatedOrder(order) {
  return dispatch => dispatch({
    type: SET_UPDATED_ORDER,
    order,
  });
}

export function postOrder(order) {
  return (dispatch) => {
    dispatch(setLoading());
    return axios.post('api/v1/orders', order).then((response) => {
      dispatch(unsetLoading());
      return response;
    }).catch((error) => {
      dispatch(unsetLoading());
      dispatch(setOrdersErrors(error.response.data));
      return error;
    });
  };
}

export function updateOrder(order) {
  return (dispatch) => {
    dispatch(setLoading());
    return axios.put(`api/v1/orders/${order.id}`, order).then((response) => {
      dispatch(unsetLoading());
      dispatch(setUpdatedOrder(response.data.order));
      return response;
    }).catch((error) => {
      dispatch(unsetLoading());
      dispatch(setOrdersErrors(error.response.data));
      return error;
    });
  };
}

export function getUserOrders(limit = 10, offset = 0) {
  return (dispatch) => {
    dispatch(setLoading());
    return axios.get(`api/v1/orders?limit=${limit}&offset=${offset}`).then((response) => {
      dispatch(unsetLoading());
      return response;
    }).catch((error) => {
      dispatch(unsetLoading());
      return error;
    });
  };
}

export function getMealsInOrder(orderId, limit = 5, offset = 0, getAll = false) {
  return (dispatch) => {
    dispatch(setLoading());
    const url = getAll ? `api/v1/meals/order/${orderId}?offset=${offset}` : `api/v1/meals/order/${orderId}?limit=${limit}&offset=${offset}`;
    return axios.get(url).then((response) => {
      dispatch(unsetLoading());
      return response;
    }).catch((error) => {
      dispatch(unsetLoading());
      dispatch(setOrdersErrors(error.response.data));
      return error;
    });
  };
}

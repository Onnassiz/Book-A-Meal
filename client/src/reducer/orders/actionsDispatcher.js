import axios from 'axios';
import { setLoading, unsetLoading } from '../formState/actionsDispatcher';
import { setOrdersErrorsAction, setUpdatedOrderAction } from './actions';

export const SET_UPDATED_ORDER = 'SET_UPDATED_ORDER';
export const SET_ORDER_SERVER_ERRORS = 'SET_ORDER_SERVER_ERRORS';

const setOrdersErrors = errors => dispatch => dispatch(setOrdersErrorsAction(errors));

export const setUpdatedOrder = order => dispatch => dispatch(setUpdatedOrderAction(order));

export const postOrder = order => (dispatch) => {
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

export const updateOrder = order => (dispatch) => {
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

export const getUserOrders = (limit = 10, offset = 0) => (dispatch) => {
  dispatch(setLoading());
  return axios.get(`api/v1/orders?limit=${limit}&offset=${offset}`).then((response) => {
    dispatch(unsetLoading());
    return response;
  }).catch((error) => {
    dispatch(unsetLoading());
    dispatch(setOrdersErrors(error.response.data));
    return error;
  });
};

export const getMealsInOrder = (orderId, limit = 5, offset = 0, getAll = false) => (dispatch) => {
  dispatch(setLoading());
  const url = getAll ? `api/v1/meals/order/${orderId}?offset=${offset}` : `api/v1/meals/order/${orderId}?offset=${offset}&limit=${limit}`;
  return axios.get(url).then((response) => {
    dispatch(unsetLoading());
    return response;
  }).catch((error) => {
    dispatch(unsetLoading());
    dispatch(setOrdersErrors(error.response.data));
    return error;
  });
};

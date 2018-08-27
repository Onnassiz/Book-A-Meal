
export const SET_UPDATED_ORDER = 'SET_UPDATED_ORDER';
export const SET_ORDER_SERVER_ERRORS = 'SET_ORDER_SERVER_ERRORS';

export const setOrdersErrorsAction = errors => ({
  type: SET_ORDER_SERVER_ERRORS,
  errors,
});

export const setUpdatedOrderAction = order => ({
  type: SET_UPDATED_ORDER,
  order,
});

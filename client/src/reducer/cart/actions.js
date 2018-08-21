
export const ADD_TO_CART = 'ADD_TO_CART';
export const EMPTY_CART = 'EMPTY_CART';
export const SET_UPDATE_MODE = 'SET_UPDATE_MODE';
export const SET_CART_STATE = 'SET_CART_STATE';
export const SET_CHECKOUT_FIELDS = 'SET_CHECKOUT_FIELDS';

function calculateTotalPrice(cart) {
  let totalPrice = 0;
  cart.forEach((meal) => {
    totalPrice += meal.totalPrice;
  });
  return totalPrice;
}

export function addToCart(item, owner) {
  return (dispatch, getState) => {
    const { cart } = getState().cart;
    cart.push(item);
    return dispatch({
      type: ADD_TO_CART,
      totalPrice: calculateTotalPrice(cart),
      cart,
      owner,
    });
  };
}

export function deleteFromCart(mealId, owner) {
  return (dispatch, getState) => {
    const cart = getState().cart.cart.filter(x => x.id !== mealId);
    return dispatch({
      type: ADD_TO_CART,
      totalPrice: calculateTotalPrice(cart),
      cart,
      owner,
    });
  };
}

export function updateCart(meal, owner) {
  return (dispatch, getState) => {
    const { cart } = getState().cart;
    const index = cart.findIndex(x => x.id === meal.id);
    cart[index] = meal;
    return dispatch({
      type: ADD_TO_CART,
      cart,
      owner,
      totalPrice: calculateTotalPrice(cart),
    });
  };
}

export function emptyCart() {
  return dispatch => dispatch({
    type: EMPTY_CART,
  });
}

export function setCheckoutFields(order) {
  return dispatch => dispatch({
    type: SET_CHECKOUT_FIELDS,
    orderId: order.id,
    contact: order.contact,
    address: order.address,
  });
}

export function setCartState(isOpen) {
  return dispatch => dispatch({
    type: SET_CART_STATE,
    isOpen,
  });
}

export function setUpdateMode() {
  return dispatch => dispatch({
    type: SET_UPDATE_MODE,
  });
}

export function addArrayToCart(itemArray, owner, order) {
  return (dispatch) => {
    dispatch(emptyCart());
    dispatch(setUpdateMode());
    dispatch(setCartState(true));
    dispatch(setCheckoutFields(order));
    return dispatch({
      type: ADD_TO_CART,
      totalPrice: calculateTotalPrice(itemArray),
      cart: itemArray,
      owner,
    });
  };
}

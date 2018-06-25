
export const ADD_TO_CART = 'ADD_TO_CART';
export const EMPTY_CART = 'EMPTY_CART';

export function addToCart(item) {
  return (dispatch, getState) => {
    const { cart } = getState().cart;
    cart.push(item);
    return dispatch({
      type: ADD_TO_CART,
      cart,
    });
  };
}

export function deleteFromCart(mealId) {
  return (dispatch, getState) => {
    const cart = getState().cart.cart.filter(x => x.id !== mealId);
    return dispatch({
      type: ADD_TO_CART,
      cart,
    });
  };
}

export function updateCart(meal) {
  return (dispatch, getState) => {
    const { cart } = getState().cart;
    const index = cart.findIndex(x => x.id === meal.id);
    cart[index] = meal;
    return dispatch({
      type: ADD_TO_CART,
      cart,
    });
  };
}

export function emptyCart() {
  return dispatch => dispatch({
    type: EMPTY_CART,
  });
}

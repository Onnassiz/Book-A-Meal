
export const ADD_TO_CART = 'ADD_TO_CART';
export const EMPTY_CART = 'EMPTY_CART';

export function addToCart(item, owner) {
  return (dispatch, getState) => {
    const { cart } = getState().cart;
    cart.push(item);
    return dispatch({
      type: ADD_TO_CART,
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
    });
  };
}

export function emptyCart() {
  return dispatch => dispatch({
    type: EMPTY_CART,
  });
}

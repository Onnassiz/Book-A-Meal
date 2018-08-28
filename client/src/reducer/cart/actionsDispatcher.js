import {
  addToCartAction,
  emptyCartAction,
  setCheckoutFieldsAction,
  setCartStateAction,
  setUpdateModeAction,
} from './actions';

export const emptyCart = () => dispatch => dispatch(emptyCartAction());

export const setCheckoutFields = order => dispatch => dispatch(setCheckoutFieldsAction(order));

export const setCartState = isOpen => dispatch => dispatch(setCartStateAction(isOpen));

export const setUpdateMode = () => dispatch => dispatch(setUpdateModeAction());

export const addToCart = (item, owner) => (dispatch, getState) => {
  const { cart } = getState().cart;
  cart.push(item);
  return dispatch(addToCartAction(cart, owner));
};

export const deleteFromCart = (mealId, owner) => (dispatch, getState) => {
  const cart = getState().cart.cart.filter(x => x.id !== mealId);
  return dispatch(addToCartAction(cart, owner));
};

export const updateCart = (meal, owner) => (dispatch, getState) => {
  const { cart } = getState().cart;
  const index = cart.findIndex(x => x.id === meal.id);
  cart[index] = meal;
  return dispatch(addToCartAction(cart, owner));
};

export function addArrayToCart(itemArray, owner, order) {
  return (dispatch) => {
    dispatch(emptyCart());
    dispatch(setUpdateMode());
    dispatch(setCartState(true));
    dispatch(setCheckoutFields(order));
    return dispatch(addToCartAction(itemArray, owner));
  };
}

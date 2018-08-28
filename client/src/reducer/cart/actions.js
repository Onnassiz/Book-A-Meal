export const ADD_TO_CART = 'ADD_TO_CART';
export const EMPTY_CART = 'EMPTY_CART';
export const SET_UPDATE_MODE = 'SET_UPDATE_MODE';
export const SET_CART_STATE = 'SET_CART_STATE';
export const SET_CHECKOUT_FIELDS = 'SET_CHECKOUT_FIELDS';

export const calculateTotalPrice = (cart) => {
  let totalPrice = 0;
  cart.forEach((meal) => {
    totalPrice += meal.totalPrice;
  });
  return totalPrice;
};

export const addToCartAction = (cart, owner) => ({
  type: ADD_TO_CART,
  totalPrice: calculateTotalPrice(cart),
  cart,
  owner,
});

export const emptyCartAction = () => ({
  type: EMPTY_CART,
});

export const setCheckoutFieldsAction = order => ({
  type: SET_CHECKOUT_FIELDS,
  orderId: order.id,
  contact: order.contact,
  address: order.address,
});

export const setCartStateAction = isOpen => ({
  type: SET_CART_STATE,
  isOpen,
});

export const setUpdateModeAction = () => ({
  type: SET_UPDATE_MODE,
});

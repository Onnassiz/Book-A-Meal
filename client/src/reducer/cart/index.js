import { ADD_TO_CART, EMPTY_CART, SET_UPDATE_MODE, SET_CART_STATE, SET_CHECKOUT_FIELDS } from './actions';

const initialState = {
  cart: [],
  owner: '',
  orderId: '',
  address: '',
  contact: '',
  isOpen: false,
  totalPrice: 0,
  updateMode: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state, cart: action.cart, owner: action.owner, totalPrice: action.totalPrice,
      };
    case EMPTY_CART:
      return {
        ...state, cart: [], owner: '', totalPrice: 0, updateMode: false, address: '', contact: '',
      };
    case SET_UPDATE_MODE:
      return {
        ...state, updateMode: true,
      };
    case SET_CART_STATE:
      return {
        ...state, isOpen: action.isOpen,
      };
    case SET_CHECKOUT_FIELDS:
      return {
        ...state, address: action.address, contact: action.contact, orderId: action.orderId,
      };
    default:
      return state;
  }
};

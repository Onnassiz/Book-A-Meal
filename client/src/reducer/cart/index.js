import { ADD_TO_CART, EMPTY_CART } from './actions';

const initialState = {
  cart: [],
  owner: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return { ...state, cart: action.cart, owner: action.owner };
    case EMPTY_CART:
      return { ...state, cart: [], owner: '' };
    default:
      return state;
  }
};

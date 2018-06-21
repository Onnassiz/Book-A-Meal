import { ADD_TO_CART, EMPTY_CART } from './action';

const initialState = {
	cart: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
	case ADD_TO_CART:
		return { ...state, cart: action.cart };
	case EMPTY_CART:
		return { ...state, cart: [] };
	default:
		return state;
	}
};

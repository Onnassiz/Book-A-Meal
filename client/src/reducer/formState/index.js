import { SET_LOADING, UNSET_LOADING } from './action';

const initialState = {
	isLoading: false,
};

export default (state = initialState, action) => {
	switch (action.type) {
	case SET_LOADING:
		return { isLoading: true };
	case UNSET_LOADING:
		return { isLoading: false };
	default:
		return state;
	}
};

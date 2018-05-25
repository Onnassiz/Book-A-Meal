export const SET_LOADING = 'SET_LOADING';
export const UNSET_LOADING = 'UNSET_LOADING';

export function setLoading() {
	return dispatch => dispatch({
		type: SET_LOADING,
	});
}

export function unsetLoading() {
	return dispatch => dispatch({
		type: UNSET_LOADING,
	});
}

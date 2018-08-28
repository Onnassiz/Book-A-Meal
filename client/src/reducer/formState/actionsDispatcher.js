import { setLoadingAction, unsetLoadingAction } from './actions';

export function setLoading() {
  return dispatch => dispatch(setLoadingAction());
}

export function unsetLoading() {
  return dispatch => dispatch(unsetLoadingAction());
}

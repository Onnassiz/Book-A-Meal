import formStateReducer from '../../src/reducer/formState';
import { SET_LOADING, UNSET_LOADING } from '../../src/reducer/formState/actions';

describe('Form State Reducers', () => {
  test('Initial State', () => {
    const action = { type: 'INVALID_ACTION' };
    const initialState = { isLoading: false };

    expect(formStateReducer(undefined, action)).toEqual(initialState);
  });

  test(SET_LOADING, () => {
    const action = { type: SET_LOADING };
    const expectedState = { isLoading: true };

    expect(formStateReducer(undefined, action)).toEqual(expectedState);
  });

  test(UNSET_LOADING, () => {
    const action = { type: UNSET_LOADING };
    const expectedState = { isLoading: false };

    expect(formStateReducer(undefined, action)).toEqual(expectedState);
  });
});

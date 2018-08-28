import menusStateReducers from '../../src/reducer/menus';
import { SET_MENUS_SERVER_ERRORS } from '../../src/reducer/menus/actions';
import { getCurrentDate } from '../../src/utilities/functions';

describe('Menus Reducers', () => {
  test('Initial State', () => {
    const action = { type: 'INVALID_ACTION' };
    const initialState = { currentDate: getCurrentDate() };

    expect(menusStateReducers(undefined, action)).toEqual(initialState);
  });

  test(SET_MENUS_SERVER_ERRORS, () => {
    const action = {
      type: SET_MENUS_SERVER_ERRORS,
      errors: {
        message: 'The date field is required',
      },
    };
    const expectedState = {
      currentDate: getCurrentDate(),
      errors: {
        message: 'The date field is required',
      },
    };

    expect(menusStateReducers(undefined, action)).toEqual(expectedState);
  });
});

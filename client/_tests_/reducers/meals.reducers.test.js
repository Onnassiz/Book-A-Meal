import mealsStateReducers from '../../src/reducer/meals';
import { SET_MEAL_SERVER_ERRORS } from '../../src/reducer/meals/actions';

describe('Meals Reducers', () => {
  test('Initial State', () => {
    const action = { type: 'INVALID_ACTION' };
    const initialState = { };

    expect(mealsStateReducers(undefined, action)).toEqual(initialState);
  });

  test(SET_MEAL_SERVER_ERRORS, () => {
    const action = {
      type: SET_MEAL_SERVER_ERRORS,
      errors: {
        message: 'The category field is required',
      },
    };
    const expectedState = {
      errors: {
        message: 'The category field is required',
      },
    };

    expect(mealsStateReducers(undefined, action)).toEqual(expectedState);
  });
});

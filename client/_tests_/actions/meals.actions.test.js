import configureStore from 'redux-mock-store';
import * as mealsActions from '../../src/reducer/meals/actions';

const mockStore = configureStore();
const store = mockStore();

describe('Set Meal Actions', () => {
  beforeEach(() => { // Runs before each test in the suite
    store.clearActions();
  });

  test('Dispatches the correct action and meals errors', () => {
    const errors = {
      message: 'The category field is required.',
    };
    const expectedActions = [
      {
        type: 'SET_MEAL_SERVER_ERRORS',
        errors,
      },
    ];
    store.dispatch(mealsActions.setMealErrorsAction(errors));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

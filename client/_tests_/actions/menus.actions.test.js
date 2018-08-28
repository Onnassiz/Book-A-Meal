import configureStore from 'redux-mock-store';
import * as menusActions from '../../src/reducer/menus/actions';

const mockStore = configureStore();
const store = mockStore();

describe('Set Menu Actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  test('Dispatches the correct action and menus errors', () => {
    const errors = {
      message: 'The date field is required',
    };
    const expectedActions = [
      {
        type: 'SET_MENUS_SERVER_ERRORS',
        errors,
      },
    ];
    store.dispatch(menusActions.setMenusErrorsAction(errors));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

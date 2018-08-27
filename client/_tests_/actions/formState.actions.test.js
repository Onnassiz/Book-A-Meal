import configureStore from 'redux-mock-store';
import * as formStateActions from '../../src/reducer/formState/actions';

const mockStore = configureStore();
const store = mockStore();

describe('Set Form State Actions', () => {
  beforeEach(() => { // Runs before each test in the suite
    store.clearActions();
  });

  test('Dispatches the correct form action', () => {
    const expectedActions = [
      {
        type: 'SET_LOADING',
      },
    ];
    store.dispatch(formStateActions.setLoadingAction());
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('Dispatches the correct form action', () => {
    const expectedActions = [
      {
        type: 'UNSET_LOADING',
      },
    ];
    store.dispatch(formStateActions.unsetLoadingAction());
    expect(store.getActions()).toEqual(expectedActions);
  });
});

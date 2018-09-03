import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as formStateActionDispatchers from '../../src/reducer/formState/actionsDispatcher';

const middleware = [thunk];

const mockStore = configureStore(middleware);
const store = mockStore({});

describe('Form state action dispatchers', () => {
  beforeEach(() => {
    store.clearActions();
  });

  test('Dispatches the correct form action', () => {
    const expectedActions = [
      {
        type: 'SET_LOADING',
      },
    ];
    store.dispatch(formStateActionDispatchers.setLoading());
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('Dispatches the correct form action', () => {
    const expectedActions = [
      {
        type: 'UNSET_LOADING',
      },
    ];
    store.dispatch(formStateActionDispatchers.unsetLoading());
    expect(store.getActions()).toEqual(expectedActions);
  });
});

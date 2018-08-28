import configureStore from 'redux-mock-store';
import * as profileActions from '../../src/reducer/profile/actions';

const mockStore = configureStore();
const store = mockStore();

describe('Set Profile Actions', () => {
  beforeEach(() => { // Runs before each test in the suite
    store.clearActions();
  });

  test('Dispatches the correct action and profile object', () => {
    const profile = {
      id: '123',
      businessName: 'Dominos',
      mission: 'The demons',
      contact: '09009009009',
      banner: 'image.jpg',
      email: 'benjamin.onah@andela.com',
    };
    const type = { type: 'SET_PROFILE' };
    const obj = Object.assign({}, type, profile);
    const expectedActions = [
      obj,
    ];
    store.dispatch(profileActions.setProfileAction(profile));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('Dispatches the correct action and profile errors', () => {
    const errors = {
      message: 'Invalid user id',
    };
    const expectedActions = [
      {
        type: 'SET_PROFILE_SERVER_ERRORS',
        errors,
      },
    ];
    store.dispatch(profileActions.setProfileErrorsAction(errors));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

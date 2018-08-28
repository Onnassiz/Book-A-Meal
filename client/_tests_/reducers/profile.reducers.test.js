import profileStateReducers from '../../src/reducer/profile';
import {
  SET_PROFILE,
  SET_PROFILE_SERVER_ERRORS,
} from '../../src/reducer/profile/actions';


describe('Profile Reducers', () => {
  test('Initial State', () => {
    const action = { type: 'INVALID_ACTION' };
    const initialState = {};

    expect(profileStateReducers(undefined, action)).toEqual(initialState);
  });

  test(SET_PROFILE_SERVER_ERRORS, () => {
    const action = {
      type: SET_PROFILE_SERVER_ERRORS,
      errors: {
        message: 'The contact field is required',
      },
    };
    const expectedState = {
      errors: {
        message: 'The contact field is required',
      },
    };

    expect(profileStateReducers(undefined, action)).toEqual(expectedState);
  });

  test(SET_PROFILE, () => {
    const action = {
      type: SET_PROFILE,
      email: 'onnass@gmail.com',
      businessName: 'The cook',
      mission: 'Say not more',
      contact: '090090090090',
    };
    const expectedState = {
      email: 'onnass@gmail.com',
      businessName: 'The cook',
      mission: 'Say not more',
      contact: '090090090090',
    };

    expect(profileStateReducers(undefined, action)).toEqual(expectedState);
  });
});

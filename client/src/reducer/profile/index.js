import { SET_PROFILE, SET_PROFILE_SERVER_ERRORS } from './actions';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE:
      return {
        id: action.id,
        businessName: action.businessName,
        email: action.email,
        mission: action.mission,
        contact: action.contact,
        banner: action.banner,
      };
    case SET_PROFILE_SERVER_ERRORS:
      return { ...state, errors: action.errors };
    default:
      return state;
  }
};

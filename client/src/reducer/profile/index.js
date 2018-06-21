import { SET_PROFILE, SET_PROFILE_ALERT, SET_PROFILE_SERVER_ERRORS } from './action';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE:
      return { id: action.id, businessName: action.businessName, email: action.email, mission: action.mission, contact: action.contact, banner: action.banner };
    case SET_PROFILE_SERVER_ERRORS:
      return { ...state, errors: action.errors };
    case SET_PROFILE_ALERT:
      return { ...state, alert: action.alert };
    default:
      return state;
  }
};

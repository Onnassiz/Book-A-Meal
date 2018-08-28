
export const SET_PROFILE = 'SET_PROFILE';
export const SET_PROFILE_SERVER_ERRORS = 'SET_PROFILE_SERVER_ERRORS';

export const setProfileAction = profile => ({
  type: SET_PROFILE,
  id: profile.id,
  businessName: profile.businessName,
  mission: profile.mission,
  contact: profile.contact,
  banner: profile.banner,
  email: profile.email,
});

export const setProfileErrorsAction = errors => ({
  type: SET_PROFILE_SERVER_ERRORS,
  errors,
});

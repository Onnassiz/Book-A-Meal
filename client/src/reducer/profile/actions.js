import axios from 'axios';
import { setLoading, unsetLoading } from '../formState/actions';

export const SET_PROFILE = 'SET_PROFILE';
export const SET_PROFILE_SERVER_ERRORS = 'SET_PROFILE_SERVER_ERRORS';
export const SET_PROFILE_ALERT = 'SET_PROFILE_ALERT';

function setAlert(alert) {
  return dispatch => dispatch({
    type: SET_PROFILE_ALERT,
    alert,
  });
}

export function setProfile(profile) {
  return dispatch => dispatch({
    type: SET_PROFILE,
    id: profile.id,
    businessName: profile.businessName,
    mission: profile.mission,
    contact: profile.contact,
    banner: profile.banner,
    email: profile.email,
  });
}

function setProfileErrors(errors) {
  return dispatch => dispatch({
    type: SET_PROFILE_SERVER_ERRORS,
    errors,
  });
}

export function postProfile(profile) {
  return (dispatch) => {
    dispatch(setLoading());
    return axios.post('api/v1/profile', profile).then((response) => {
      dispatch(unsetLoading());
      dispatch(setProfile(response.data));
      dispatch(setAlert('Profile successfully created'));
      return response;
    }).catch((error) => {
      dispatch(unsetLoading());
      dispatch(setProfileErrors(error.response.data));
      return error;
    });
  };
}

export function updateProfile(profile) {
  return (dispatch) => {
    dispatch(setLoading());
    return axios.put(`api/v1/profile/${profile.id}`, profile).then((response) => {
      dispatch(unsetLoading());
      dispatch(setProfile(response.data));
      dispatch(setAlert('Profile successfully updated'));
      return response;
    }).catch((error) => {
      dispatch(unsetLoading());
      dispatch(setProfileErrors(error.response.data));
      return error;
    });
  };
}

export function putImage(id, field) {
  return (dispatch) => {
    dispatch(setLoading());
    return axios.put(`api/v1/profile/image/${id}`, field).then((response) => {
      dispatch(unsetLoading());
      dispatch(setProfile(response.data));
      dispatch(setAlert('Banner successfully uploaded'));
      return response;
    }).catch((error) => {
      dispatch(unsetLoading());
      dispatch(setProfileErrors(error.response.data));
      return error;
    });
  };
}

export function getProfile() {
  return (dispatch) => {
    dispatch(setLoading());
    return axios.get('api/v1/profile').then((response) => {
      dispatch(unsetLoading());
      dispatch(setProfile(response.data));
      return response;
    }).catch((error) => {
      dispatch(unsetLoading());
      return error;
    });
  };
}

import axios from 'axios';
import { setLoading, unsetLoading } from '../formState/actionsDispatcher';
import { setProfileAction, setProfileErrorsAction } from './actions';


export const setProfile = profile => dispatch => dispatch(setProfileAction(profile));

const setProfileErrors = errors => dispatch => dispatch(setProfileErrorsAction(errors));

export const postProfile = profile => (dispatch) => {
  dispatch(setLoading());
  return axios.post('api/v1/profile', profile).then((response) => {
    dispatch(unsetLoading());
    dispatch(setProfile(response.data));
    return response;
  }).catch((error) => {
    dispatch(unsetLoading());
    dispatch(setProfileErrors(error.response.data));
    return error;
  });
};

export const updateProfile = profile => (dispatch) => {
  dispatch(setLoading());
  return axios.put(`api/v1/profile/${profile.id}`, profile).then((response) => {
    dispatch(unsetLoading());
    dispatch(setProfile(response.data));
    return response;
  }).catch((error) => {
    dispatch(unsetLoading());
    dispatch(setProfileErrors(error.response.data));
    return error;
  });
};

export const putImage = (id, field) => (dispatch) => {
  dispatch(setLoading());
  return axios.put(`api/v1/profile/${id}`, field).then((response) => {
    dispatch(unsetLoading());
    dispatch(setProfile(response.data));
    return response;
  }).catch((error) => {
    dispatch(unsetLoading());
    dispatch(setProfileErrors(error.response.data));
    return error;
  });
};

export const getProfile = () => (dispatch) => {
  dispatch(setLoading());
  return axios.get('api/v1/profile').then((response) => {
    dispatch(unsetLoading());
    dispatch(setProfile(response.data));
    return response;
  }).catch((error) => {
    dispatch(unsetLoading());
    dispatch(setProfileErrors(error.response.data));
    return error;
  });
};

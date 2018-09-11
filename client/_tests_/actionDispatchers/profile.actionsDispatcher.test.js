import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as profileActionsDispatcher from '../../src/reducer/profile/actionsDispatcher';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({});
const mock = new MockAdapter(axios);
axios.defaults.baseURL = 'http://localhost:3009/';


describe('Profile Action Dispatchers', () => {
  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  test('Dispatches the correct actions when profile is created successfully', () => {
    const response = {
      message: 'profile successfully placed',
      id: '2794fddd-14f3-4ec9-a1dc-88ad2bc649da',
      email: 'email@gmail.com',
      banner: 'https://image.jpeg',
      contact: '01223212311',
      mission: 'Get all the money in the world',
      businessName: 'The Goods',
    };

    mock.onPost('api/v1/profile').reply(201, response);

    const expectedActions = [
      {
        type: 'SET_LOADING',
      },
      {
        type: 'UNSET_LOADING',
      },
      {
        id: '2794fddd-14f3-4ec9-a1dc-88ad2bc649da',
        email: 'email@gmail.com',
        banner: 'https://image.jpeg',
        contact: '01223212311',
        mission: 'Get all the money in the world',
        businessName: 'The Goods',
        type: 'SET_PROFILE',
      },
    ];
    store.dispatch(profileActionsDispatcher.postProfile({})).then((res) => {
      expect(res.status).toEqual(201);
      expect(res.data).toEqual(response);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('Dispatches the correct actions when there is an error creating a profile', () => {
    const response = {
      message: 'You have already added a business profile',
    };

    mock.onPost('api/v1/profile').reply(400, response);

    const expectedActions = [
      {
        type: 'SET_LOADING',
      },
      {
        type: 'UNSET_LOADING',
      },
      {
        type: 'SET_PROFILE_SERVER_ERRORS',
        errors: response,
      },
    ];
    store.dispatch(profileActionsDispatcher.postProfile({})).then((error) => {
      expect(error.response.status).toEqual(400);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('Dispatches the correct actions when profile is updated', () => {
    const response = {
      message: 'profile successfully updated',
      id: '2794fddd-14f3-4ec9-a1dc-88ad2bc649da',
      email: 'email@gmail.com',
      banner: 'https://image.jpeg',
      contact: '01223212311',
      mission: 'Get all the money in the world',
      businessName: 'The Goods',
    };

    mock.onPut('api/v1/profile/2794fddd-14f3-4ec9-a1dc-88ad2bc649da').reply(200, response);

    const expectedActions = [
      {
        type: 'SET_LOADING',
      },
      {
        type: 'UNSET_LOADING',
      },
      {
        id: '2794fddd-14f3-4ec9-a1dc-88ad2bc649da',
        email: 'email@gmail.com',
        banner: 'https://image.jpeg',
        contact: '01223212311',
        mission: 'Get all the money in the world',
        businessName: 'The Goods',
        type: 'SET_PROFILE',
      },
    ];
    store.dispatch(profileActionsDispatcher.updateProfile(response)).then((res) => {
      expect(res.status).toEqual(200);
      expect(res.data).toEqual(response);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('Dispatches the correct actions when profile image is updated', () => {
    const response = {
      message: 'profile successfully updated',
      id: '2794fddd-14f3-4ec9-a1dc-88ad2bc649da',
      email: 'email@gmail.com',
      banner: 'https://image.jpeg',
      contact: '01223212311',
      mission: 'Get all the money in the world',
      businessName: 'The Goods',
    };

    mock.onPut('api/v1/profile/2794fddd-14f3-4ec9-a1dc-88ad2bc649da').reply(200, response);

    const expectedActions = [
      {
        type: 'SET_LOADING',
      },
      {
        type: 'UNSET_LOADING',
      },
      {
        id: '2794fddd-14f3-4ec9-a1dc-88ad2bc649da',
        email: 'email@gmail.com',
        banner: 'https://image.jpeg',
        contact: '01223212311',
        mission: 'Get all the money in the world',
        businessName: 'The Goods',
        type: 'SET_PROFILE',
      },
    ];
    store.dispatch(profileActionsDispatcher.putImage(response.id, response)).then((res) => {
      expect(res.status).toEqual(200);
      expect(res.data).toEqual(response);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('Dispatches the correct actions when there is an error updating a profile', () => {
    const response = {
      message: 'You are not authorized',
    };

    mock.onPut('api/v1/profile/2794fddd-14f3-4ec9-a1dc-88ad2bc649da').reply(400, response);

    const formData = {
      id: '2794fddd-14f3-4ec9-a1dc-88ad2bc649da',
    };

    const expectedActions = [
      {
        type: 'SET_LOADING',
      },
      {
        type: 'UNSET_LOADING',
      },
      {
        type: 'SET_PROFILE_SERVER_ERRORS',
        errors: response,
      },
    ];
    store.dispatch(profileActionsDispatcher.updateProfile(formData)).then((error) => {
      expect(error.response.status).toEqual(400);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('Dispatches the correct actions when there is an error updating a image', () => {
    const response = {
      message: 'You are not authorized',
    };

    mock.onPut('api/v1/profile/2794fddd-14f3-4ec9-a1dc-88ad2bc649da').reply(400, response);

    const formData = {
      id: '2794fddd-14f3-4ec9-a1dc-88ad2bc649da',
    };

    const expectedActions = [
      {
        type: 'SET_LOADING',
      },
      {
        type: 'UNSET_LOADING',
      },
      {
        type: 'SET_PROFILE_SERVER_ERRORS',
        errors: response,
      },
    ];
    store.dispatch(profileActionsDispatcher.putImage(formData.id, {})).then((error) => {
      expect(error.response.status).toEqual(400);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('Dispatches the correct actions when profile is fetched', () => {
    const response = {
      id: '2794fddd-14f3-4ec9-a1dc-88ad2bc649da',
      email: 'email@gmail.com',
      banner: 'https://image.jpeg',
      contact: '01223212311',
      mission: 'Get all the money in the world',
      businessName: 'The Goods',
    };

    mock.onGet('api/v1/profile').reply(200, response);

    const expectedActions = [
      {
        type: 'SET_LOADING',
      },
      {
        type: 'UNSET_LOADING',
      },
      {
        id: '2794fddd-14f3-4ec9-a1dc-88ad2bc649da',
        email: 'email@gmail.com',
        banner: 'https://image.jpeg',
        contact: '01223212311',
        mission: 'Get all the money in the world',
        businessName: 'The Goods',
        type: 'SET_PROFILE',
      },
    ];
    store.dispatch(profileActionsDispatcher.getProfile()).then((res) => {
      expect(res.status).toEqual(200);
      expect(res.data).toEqual(response);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('Dispatches the correct actions when there is an error fetching a profile', () => {
    const response = {
      message: 'You are not authorized',
    };

    mock.onGet('api/v1/profile').reply(400, response);


    const expectedActions = [
      {
        type: 'SET_LOADING',
      },
      {
        type: 'UNSET_LOADING',
      },
    ];
    store.dispatch(profileActionsDispatcher.getProfile()).then((error) => {
      expect(error.response.status).toEqual(400);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

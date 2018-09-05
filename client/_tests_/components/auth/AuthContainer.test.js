import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import toJson from 'enzyme-to-json';
import AuthContainer from '../../../src/components/container/AuthContainer';

const mockStore = configureStore();

const store = mockStore({
  formState: { isLoading: false },
  user: {
    signUpErrors: {},
    signInErrors: {},
  },
});

const wrapper = mount(<MemoryRouter initialEntries={[{ pathname: '/', key: 'testKey' }]}><AuthContainer store={store} /></MemoryRouter>);

describe('<AuthContainer />', () => {
  it('Should render the Auth container successfully', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

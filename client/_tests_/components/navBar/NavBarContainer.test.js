import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import NavBarContainer from '../../../src/components/container/NavBarContainer';
import userInfo from '../../objectProps/user.props';

const mockStore = configureStore();
const store = mockStore({ user: userInfo });

const props = {
  users: {},
  page: 'home',
};

const wrapper = shallow(<NavBarContainer {...props} store={store} />);

describe('<NavBarContainer />', () => {
  it('Should render container component', () => {
    expect(wrapper.length).toBe(1);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

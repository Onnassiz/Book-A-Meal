import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import NavBar from '../../../src/components/presentation/layout/NavBar';
import userInfo from '../../objectProps/user.props';
import LocalStorageMock from '../../mocks/localStorage';

const props = {
  user: userInfo,
  page: 'home',
};

const emptyUserProps = {
  user: {},
  page: 'home',
};

global.localStorage = new LocalStorageMock();

const wrapper = shallow(<NavBar {...props} />);
const wrapperForEmptyUser = shallow(<NavBar {...emptyUserProps} />);

jest.useFakeTimers();
describe('<NavBar />', () => {
  it('Should render presentation component', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Should render presentation component when user is empty', () => {
    expect(toJson(wrapperForEmptyUser)).toMatchSnapshot();
  });

  it('Should sign delete user info from local storage when sign out is link is clicked', () => {
    wrapper.find('#signOut').simulate('click');
    jest.runAllTimers();
    expect(localStorage.getItem('id')).toEqual(null);
    expect(localStorage.getItem('email')).toEqual(null);
    expect(localStorage.getItem('role')).toEqual(null);
    expect(localStorage.getItem('name')).toEqual(null);
    expect(localStorage.getItem('token')).toEqual(null);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 500);
  });

  it('Should set show state when menu icon is clicked', () => {
    wrapper.find('#menuIcon').simulate('click');
    expect(wrapper.state().show).toBe('showAdmin');
  });

  it('Should set show state when menu icon is clicked and the current user is a customer', () => {
    const user = userInfo;
    user.role = 'customer';
    wrapper.setProps({ user });
    wrapper.setState({ show: '' });
    wrapper.find('#menuIcon').simulate('click');
    expect(wrapper.state().show).toBe('show');
  });
});

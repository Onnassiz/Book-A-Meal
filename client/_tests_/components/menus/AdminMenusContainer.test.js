import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import toJson from 'enzyme-to-json';
import AdminMenusContainer, { mapStateToProps, mapDispatchToProps } from '../../../src/components/container/AdminMenusContainer';

const mockStore = configureStore();

const store = mockStore({
  profile: {},
  user: {},
  formState: { isLoading: false },
  menus: {},
  meals: {},
});

const initialState = {
  profile: {},
  user: {},
  formState: { isLoading: false },
};

const wrapper = shallow(<AdminMenusContainer store={store} />);

describe('<AdminMenusContainer />', () => {
  it('Should render the AdminMenus container successfully', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).getProfile();
    expect(mapStateToProps(initialState).profile).toEqual({});
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

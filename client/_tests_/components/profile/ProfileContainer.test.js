import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import toJson from 'enzyme-to-json';
import ProfileContainer, { mapStateToProps, mapDispatchToProps } from '../../../src/components/container/ProfileContainer';

const mockStore = configureStore();

const store = mockStore({
  profile: {},
  user: {},
  formState: { isLoading: false },
});

const initialState = {
  profile: {},
  user: {},
  formState: { isLoading: false },
};

const wrapper = shallow(<ProfileContainer store={store} />);

describe('<ProfileContainer />', () => {
  it('Should render the Profile container successfully', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).getProfile();
    expect(mapStateToProps(initialState).profile).toEqual({});
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

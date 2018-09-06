import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import toJson from 'enzyme-to-json';
import UserHomePageContainer from '../../../src/components/container/UserHomePageContainer';

const mockStore = configureStore();
const store = mockStore({});

const wrapper = shallow(<UserHomePageContainer store={store} />);

describe('<UserHomePageContainer />', () => {
  it('Render User Home Page Container', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Profile from '../../../src/components/pages/Profile';

const wrapper = shallow(<Profile />);

describe('<Profile />', () => {
  it('Should render Profile page successfully', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

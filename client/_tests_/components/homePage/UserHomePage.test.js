import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import UserHomePage from '../../../src/components/pages/UserHomePage';

const wrapper = shallow(<UserHomePage />);

describe('<UserHomePage />', () => {
  it('Render User Home page', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import UserHomePage from '../../../src/components/presentation/UserHomePage';

const wrapper = shallow(<UserHomePage />);

describe('<UserHomePage />', () => {
  it('Render User Home Page Presentation component', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

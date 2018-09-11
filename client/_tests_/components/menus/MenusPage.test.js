import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Menus from '../../../src/components/pages/Menus';

const wrapper = shallow(<Menus />);

describe('<Menus />', () => {
  it('Should render Menu page successfully', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import AdminMenus from '../../../src/components/pages/AdminMenus';

const wrapper = shallow(<AdminMenus />);

describe('<AdminMenus />', () => {
  it('Should render Admin Menu page successfully', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

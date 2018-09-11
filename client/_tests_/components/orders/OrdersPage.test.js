import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Orders from '../../../src/components/pages/Orders';

const wrapper = shallow(<Orders />);

describe('<Orders />', () => {
  it('Should render Orders page successfully', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

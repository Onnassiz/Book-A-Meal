import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Cart from '../../../src/components/pages/Cart';

const wrapper = shallow(<Cart />);

describe('<Cart />', () => {
  it('Should render Cart page successfully', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

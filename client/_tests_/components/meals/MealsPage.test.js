import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Meals from '../../../src/components/pages/Meals';

const wrapper = shallow(<Meals />);

describe('<Meals />', () => {
  it('Should render Meals page successfully', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

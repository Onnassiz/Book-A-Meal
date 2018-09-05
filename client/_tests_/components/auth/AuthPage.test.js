import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Auth from '../../../src/components/pages/Auth';

const wrapper = shallow(<Auth />);

describe('<Auth />', () => {
  it('Should render Auth page successfully', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

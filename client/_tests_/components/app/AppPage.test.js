import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import App from '../../../src/components/pages/App';

const wrapper = shallow(<App />);

describe('<App />', () => {
  it('Should render App page successfully', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

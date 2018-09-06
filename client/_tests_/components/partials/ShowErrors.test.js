import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ShowErrors from '../../../src/components/presentation/partials/ShowErrors';

const props = {
  serverErrors: {
    message: 'Request failed',
  },
  clientErrors: {
    email: 'Email is invalid',
  },
};

const wrapper = shallow(<ShowErrors {...props} />);

describe('<ShowErrors />', () => {
  it('Should render error component successfully', () => {
    expect(wrapper.length).toBe(1);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

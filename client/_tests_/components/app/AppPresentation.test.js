import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import App from '../../../src/components/presentation/App';
import user from '../../objectProps/user.props';

const props = {
  setUser: jest.fn(),
  emptyCart: jest.fn(),
  cart: {},
  user,
};

const wrapper = shallow(<App {...props} />);

describe('<App />', () => {
  it('Should render App presentation components successfully', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});


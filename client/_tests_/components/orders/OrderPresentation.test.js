import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Orders from '../../../src/components/presentation/Orders';
import user from '../../objectProps/user.props';

const props = {
  getUserOrders: () => new Promise(resolve => resolve({ status: 200 })),
  getMealsInOrder: () => new Promise(resolve => resolve({ status: 200 })),
  addArrayToCart: jest.fn(),
  setUpdatedOrder: jest.fn(),
  orders: {},
  user,
};

const wrapper = shallow(<Orders {...props} />);

describe('<Orders />', () => {
  it('Should render Orders presentation components successfully', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});


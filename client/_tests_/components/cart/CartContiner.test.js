import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import toJson from 'enzyme-to-json';
import user from '../../objectProps/user.props';
import CartContainer from '../../../src/components/container/CartContainer';
import getMealsMock from '../../../../testHelpers/meals/mock';

const mockStore = configureStore();

const store = mockStore({
  orders: {},
  formState: { isLoading: false },
  user,
  cart: {
    cart: getMealsMock(1),
    owner: '',
    orderId: '',
    address: '',
    contact: '',
    isOpen: false,
    totalPrice: 0,
    updateMode: false,
  },
});

const wrapper = shallow(<CartContainer store={store} />);

describe('<CartContainer />', () => {
  it('Should render the CartContainer container successfully', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

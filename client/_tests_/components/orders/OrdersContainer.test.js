import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import toJson from 'enzyme-to-json';
import user from '../../objectProps/user.props';
import OrdersContainer from '../../../src/components/container/OrdersContainer';

const mockStore = configureStore();

const store = mockStore({
  orders: {},
  formState: { isLoading: false },
  user,
});

const wrapper = shallow(<OrdersContainer store={store} />);

describe('<OrdersContainer />', () => {
  it('Should render the OrdersContainer container successfully', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import toJson from 'enzyme-to-json';
import user from '../../objectProps/user.props';
import AppContainer, { mapStateToProps, mapDispatchToProps } from '../../../src/components/container/AppContainer';
import getMealsMock from '../../../../testHelpers/meals/mock';

const mockStore = configureStore();

const store = mockStore({
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

const wrapper = shallow(<AppContainer store={store} />);

const initialState = {
  user: {},
  formState: { isLoading: false },
};

describe('<AppContainer />', () => {
  it('Should render the AppContainer container successfully', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).setUser();
    expect(mapStateToProps(initialState).user).toEqual({});
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

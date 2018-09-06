import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import toJson from 'enzyme-to-json';
import MenusContainer, { mapStateToProps, mapDispatchToProps } from '../../../src/components/container/MenusContainer';

const mockStore = configureStore();

const store = mockStore({
  user: {},
  formState: { isLoading: false },
  menus: {},
  cart: {},
  orders: {},
});

const initialState = {
  user: {},
  formState: { isLoading: false },
};

const wrapper = shallow(<MenusContainer store={store} />);

describe('<MenusContainer />', () => {
  it('Should render the MenusContainer container successfully', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).addToCart();
    expect(mapStateToProps(initialState).user).toEqual({});
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

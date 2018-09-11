import React from 'react';
import { shallow } from 'enzyme';
import SlidingPane from 'react-sliding-pane';
import toJson from 'enzyme-to-json';
import Modal from 'react-modal';
import Cart from '../../../src/components/presentation/Cart';
import user from '../../objectProps/user.props';
import { BasicInput } from '../../../src/components/presentation/form/BasicInput';
import CartSidePane from '../../../src/components/presentation/partials/CartSidePane';
import CartItem from '../../../src/components/presentation/partials/CartItem';
import { getMealsMock } from '../../objectProps/meals.props';

const cart = {
  cart: getMealsMock(1),
  owner: '',
  orderId: '',
  address: '',
  contact: '',
  isOpen: false,
  totalPrice: 0,
  updateMode: false,
};

const props = {
  orders: {},
  formState: { isLoading: false },
  user,
  cart,
  emptyCart: jest.fn(),
  deleteFromCart: jest.fn(),
  updateOrder: () => new Promise(resolve => resolve({ status: 200 })),
  updateCart: jest.fn(),
  setCartState: jest.fn(),
  postOrder: () => new Promise(resolve => resolve({ status: 201 })),
};

const wrapper = shallow(<Cart {...props} />);

describe('<Cart />', () => {
  it('Should render the Cart container successfully', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Should trigger onChange when input field is updated', () => {
    wrapper.find(BasicInput).dive().find('input').simulate('change', { target: { name: 'address', value: 'This is the address' } });
    expect(wrapper.state().address).toBe('This is the address');
  });

  it('Should trigger removeFromCart when remove button is clicked', () => {
    const removeFromCartSpy = jest.spyOn(wrapper.instance(), 'removeFromCart');

    wrapper.setState({});

    wrapper.find(CartSidePane).dive().find(CartItem).first()
      .dive()
      .find('.cart-button')
      .simulate('click');

    expect(removeFromCartSpy).toHaveBeenCalled();
  });

  it('Should trigger updateUnits when number input field button is clicked', () => {
    const updateUnitsSpy = jest.spyOn(wrapper.instance(), 'updateUnits');

    wrapper.setState({});

    wrapper.find(CartSidePane).dive().find(CartItem).first()
      .simulate('updateUnits');

    expect(updateUnitsSpy).toHaveBeenCalled();
  });

  it('Should trigger showCheckoutForm and showCheckoutForm when checkout button is click', () => {
    const showCheckoutFormSpy = jest.spyOn(wrapper.instance(), 'showCheckoutForm');

    wrapper.setState({});

    wrapper.find(CartSidePane).dive().find('.checkout').find('button')
      .last()
      .simulate('click');

    expect(wrapper.state().showCheckoutModal).toBe(true);
    expect(wrapper.state().isPaneOpenLeftCart).toBe(false);
    expect(showCheckoutFormSpy).toHaveBeenCalled();
  });

  it('Should trigger onRequestClose when CartSidePane close button is clicked', () => {
    const showCartSpy = jest.spyOn(wrapper.instance(), 'showCart');

    wrapper.setState({});

    wrapper.find(CartSidePane).dive().find(SlidingPane)
      .simulate('requestClose');

    expect(showCartSpy).toHaveBeenCalled();
  });

  it('Should trigger placeOrder and show errors when checkout form is submitted with empty fields', () => {
    const placeOrderSpy = jest.spyOn(wrapper.instance(), 'placeOrder');

    wrapper.setState({ telephone: '', address: '' });

    wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

    expect(wrapper.state().errors.telephone).toBe('The phone number field is required');
    expect(wrapper.state().errors.address).toBe('The address field is required');
    expect(placeOrderSpy).toHaveBeenCalled();
  });

  it('Should trigger placeOrder and createOrder when checkout button is clicked', (done) => {
    const placeOrderSpy = jest.spyOn(wrapper.instance(), 'placeOrder');
    const createOrderSpy = jest.spyOn(wrapper.instance(), 'createOrder');

    wrapper.setState({ telephone: '080232232232', address: 'This is an address' });

    wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

    setImmediate(() => {
      expect(wrapper.state().showCheckoutModal).toBe(false);
      expect(wrapper.state().address).toBe('');
      expect(wrapper.state().telephone).toBe('');
      expect(placeOrderSpy).toHaveBeenCalled();
      expect(createOrderSpy).toHaveBeenCalled();
      done();
    });
  });

  it('Should trigger placeOrder and updateOrder when checkout button is clicked', (done) => {
    const placeOrderSpy = jest.spyOn(wrapper.instance(), 'placeOrder');
    const updateOrderSpy = jest.spyOn(wrapper.instance(), 'updateOrder');

    wrapper.setState({ telephone: '080232232232', address: 'This is an address' });

    cart.updateMode = true;
    wrapper.setProps({ cart });

    wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

    setImmediate(() => {
      expect(wrapper.state().showCheckoutModal).toBe(false);
      expect(wrapper.state().address).toBe('');
      expect(wrapper.state().telephone).toBe('');
      expect(placeOrderSpy).toHaveBeenCalled();
      expect(updateOrderSpy).toHaveBeenCalled();
      done();
    });
  });

  it('Should trigger afterOpenModal when checkout modal shows', () => {
    const afterOpenModalSpy = jest.spyOn(wrapper.instance(), 'afterOpenModal');

    wrapper.setState({});

    wrapper.find(Modal).simulate('afterOpen');

    expect(afterOpenModalSpy).toHaveBeenCalled();
  });

  it('Should trigger renderFixedCart to show cart', () => {
    const showCartSpy = jest.spyOn(wrapper.instance(), 'showCart');

    wrapper.setState({});

    wrapper.find('.ion-ios-cart-outline').simulate('click');

    expect(showCartSpy).toHaveBeenCalled();
  });
});

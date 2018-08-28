import configureStore from 'redux-mock-store';
import * as cartActions from '../../src/reducer/cart/actions';

const mockStore = configureStore();
const store = mockStore();

describe('Set Cart Actions', () => {
  beforeEach(() => { // Runs before each test in the suite
    store.clearActions();
  });

  test('Dispatches the correct cart action and cart payload', () => {
    const cart = [
      {
        mealId: '123',
        units: 2,
        price: 123,
        totalPrice: 246,
      },
    ];
    const expectedActions = [
      {
        type: 'ADD_TO_CART',
        totalPrice: 246,
        owner: '1232',
        cart,
      },
    ];
    store.dispatch(cartActions.addToCartAction(cart, '1232'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('Dispatches the correct cart action and payload for checkout form', () => {
    const order = {
      id: '123123',
      contact: '09012192121',
      address: 'The best place to be',
    };
    const expectedActions = [
      {
        type: 'SET_CHECKOUT_FIELDS',
        orderId: '123123',
        contact: '09012192121',
        address: 'The best place to be',
      },
    ];
    store.dispatch(cartActions.setCheckoutFieldsAction(order));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('Dispatches the correct cart action for cart display toggle', () => {
    const isOpen = true;
    const expectedActions = [
      {
        type: 'SET_CART_STATE',
        isOpen,
      },
    ];
    store.dispatch(cartActions.setCartStateAction(isOpen));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('Dispatches the correct cart action for cart update mode', () => {
    const expectedActions = [
      {
        type: 'SET_UPDATE_MODE',
      },
    ];
    store.dispatch(cartActions.setUpdateModeAction());
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('Dispatches the correct cart action during cart empty', () => {
    const expectedActions = [
      {
        type: 'EMPTY_CART',
      },
    ];
    store.dispatch(cartActions.emptyCartAction());
    expect(store.getActions()).toEqual(expectedActions);
  });
});

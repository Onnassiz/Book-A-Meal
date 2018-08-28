import cartStateReducers from '../../src/reducer/cart';
import {
  ADD_TO_CART,
  EMPTY_CART,
  SET_UPDATE_MODE,
  SET_CART_STATE,
  SET_CHECKOUT_FIELDS,
} from '../../src/reducer/cart/actions';

describe('Menus Reducers', () => {
  const initialState = {
    cart: [],
    owner: '',
    orderId: '',
    address: '',
    contact: '',
    isOpen: false,
    totalPrice: 0,
    updateMode: false,
  };

  test('Initial State', () => {
    const action = { type: 'INVALID_ACTION' };
    expect(cartStateReducers(undefined, action)).toEqual(initialState);
  });

  test(ADD_TO_CART, () => {
    const action = {
      type: ADD_TO_CART,
      cart: [],
      owner: '123',
      totalPrice: 224,
    };
    const expectedState = {
      cart: [],
      owner: '123',
      orderId: '',
      address: '',
      contact: '',
      isOpen: false,
      totalPrice: 224,
      updateMode: false,
    };

    expect(cartStateReducers(undefined, action)).toEqual(expectedState);
  });

  test(EMPTY_CART, () => {
    const action = {
      type: EMPTY_CART,
    };
    expect(cartStateReducers(undefined, action)).toEqual(initialState);
  });

  test(SET_UPDATE_MODE, () => {
    const action = {
      type: SET_UPDATE_MODE,
    };

    const expectedState = {
      cart: [],
      owner: '',
      orderId: '',
      address: '',
      contact: '',
      isOpen: false,
      totalPrice: 0,
      updateMode: true,
    };

    expect(cartStateReducers(undefined, action)).toEqual(expectedState);
  });

  test(SET_CART_STATE, () => {
    const action = {
      type: SET_CART_STATE,
      isOpen: true,
    };

    const expectedState = {
      cart: [],
      owner: '',
      orderId: '',
      address: '',
      contact: '',
      isOpen: true,
      totalPrice: 0,
      updateMode: false,
    };

    expect(cartStateReducers(undefined, action)).toEqual(expectedState);
  });

  test(SET_CHECKOUT_FIELDS, () => {
    const action = {
      type: SET_CHECKOUT_FIELDS,
      address: 'This is the address',
      contact: '09090909090',
      orderId: '1234',
    };

    const expectedState = {
      cart: [],
      owner: '',
      orderId: '1234',
      address: 'This is the address',
      contact: '09090909090',
      isOpen: false,
      totalPrice: 0,
      updateMode: false,
    };

    expect(cartStateReducers(undefined, action)).toEqual(expectedState);
  });
});

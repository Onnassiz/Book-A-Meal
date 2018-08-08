import React from 'react';
import CartContainer from '../container/CartContainer';
import NavBarContainer from '../container/NavBarContainer';

const Cart = () => (
  <div>
    <NavBarContainer page="cart" />
    <CartContainer />
  </div>
);

export default Cart;

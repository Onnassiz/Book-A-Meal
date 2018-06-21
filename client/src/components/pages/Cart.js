import React, { Component } from 'react';
import CartContainer from '../container/CartContainer';
import NavBarContainer from '../container/NavBarContainer';

class Cart extends Component {
  render() {
    return (
			<div>
				<NavBarContainer page="cart" />
				<CartContainer />
			</div>
    );
  }
}

export default Cart;

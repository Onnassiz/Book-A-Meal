import React from 'react';
import PropTypes from 'prop-types';
import empty from 'is-empty';
import SlidingPane from 'react-sliding-pane';
import CartItem from './../partials/CartItem';

const CartSidePane = props => (
  <SlidingPane
    isOpen={props.isOpen}
    title="Cart Info"
    from="left"
    width="320px"
    onRequestClose={props.closeCartPane}
  >
    <div>
      {props.cart.updateMode ?
        <div id="empty-cart">
          <h2>Modify Order</h2>
        </div> : ''}
      <div>
        {empty(props.cart.cart) ?
          <div id="empty-cart">
            <h2>Your cart is empty</h2>
          </div> : props.cart.cart.map(meal =>
            (<CartItem
              deleteFromCart={() => props.removeFromCart(meal.id)}
              meal={meal}
              key={meal.id + meal.caterer}
              updateUnits={e => props.updateUnits(e, meal)}
            />))}
      </div>
      <div className="checkout">
        {empty(props.cart.cart) ? '' :
        <div>
          <div className="cart_summary_body">
            <p className="num">Number of Items: {props.cart.length}</p>
            <p className="num">Delivery Fee: &#8358;0.00</p>
            <p className="num">Discount: &#8358;0.00</p>
            <br />
            <br />
            <p className="num">Total Amount: <b>&#8358;{props.cart.totalPrice}.00</b></p>
            <br />
            <p>
              <button onClick={props.emptyCart}>Empty Cart</button>
              <button onClick={props.checkout}>{props.cart.updateMode ? 'Next' : 'Checkout'}</button>
            </p>
          </div>
        </div>}
      </div>
    </div>
  </SlidingPane>
);

CartSidePane.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeCartPane: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired,
  totalPrice: PropTypes.string.isRequired,
  emptyCart: PropTypes.func.isRequired,
  checkout: PropTypes.func.isRequired,
};

export default CartSidePane;

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
      <div>
        {empty(props.cart) ?
          <div id="empty-cart">
            <h2>Your cart is empty</h2>
          </div> : props.cart.map(meal =>
            (<CartItem
              deleteFromCart={() => props.removeFromCart(meal.id)}
              meal={meal}
              key={meal.id + meal.caterer}
              updateUnits={e => this.updateUnits(e, meal)}
            />))}
      </div>
      <div className="checkout">
        {empty(props.cart) ? '' :
        <div>
          <div className="cart_summary_body">
            <h2>Order Summary</h2>
            <p className="num">Number of Items: {props.cart.length}</p>
            <p className="num">Delivery Fee: &#8358;0.00</p>
            <p className="num">Discount: &#8358;0.00</p>
            <br />
            <br />
            <p className="num">Total Amount: <b>&#8358;{props.totalPrice}.00</b></p>
            <br />
            <p>
              <button onClick={props.emptyCart}>Empty Cart</button>
              <button onClick={props.toggleOrderModal}>Checkout</button>
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
  cart: PropTypes.array.isRequired,
  totalPrice: PropTypes.string.isRequired,
  emptyCart: PropTypes.func.isRequired,
  toggleOrderModal: PropTypes.func.isRequired,
};

export default CartSidePane;

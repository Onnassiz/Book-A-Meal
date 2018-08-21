import React, { Component } from 'react';
import PropTypes from 'prop-types';
import empty from 'is-empty';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { addProfileImageModalView } from './../../utilities/modalStyles';
import { BasicInput, TextArea } from './form/BasicInput';
import SubmitButton from '../presentation/form/SubmitButton';
import CartSidePane from './partials/CartSidePane';
import { numberWithCommas } from '../../utilities/functions';
import validateOrder from '../../utilities/validateOrder';


class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      totalPrice: 0,
      isPaneOpenLeftCart: false,
      showCheckoutModal: false,
      telephone: '',
      address: '',
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.showCart = this.showCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.updateUnits = this.updateUnits.bind(this);
    this.showCheckoutForm = this.showCheckoutForm.bind(this);
    this.closeCheckoutForm = this.closeCheckoutForm.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  removeFromCart(mealId) {
    const { deleteFromCart, user } = this.props;
    deleteFromCart(mealId, user.id);
  }

  updateUnits(e, currentMeal) {
    const { value } = e.target;
    if (value > 0) {
      const { updateCart, user } = this.props;
      const meal = currentMeal;
      meal.units = parseInt(value, 10);
      meal.totalPrice = value * meal.price;
      updateCart(meal, user.id);
    }
  }

  showCart(state) {
    this.props.setCartState(state);
  }

  closeCheckoutForm() {
    this.setState({
      showCheckoutModal: false,
    });
  }

  showCheckoutForm() {
    this.setState({
      showCheckoutModal: true,
      isPaneOpenLeftCart: false,
    });
  }

  isValid() {
    this.setState({ errors: {} });
    const { errors, isValid } = validateOrder(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  afterOpenModal() {
    const { cart } = this.props;
    this.showCart(false);
    if (cart.updateMode) {
      this.setState({
        id: cart.orderId,
        address: cart.address,
        telephone: cart.contact,
      });
    }
  }

  createOrder(order) {
    const { postOrder } = this.props;
    postOrder(order).then((response) => {
      const { emptyCart } = this.props;
      if (response.status === 201) {
        this.resetFields();
        this.closeCheckoutForm();
        emptyCart();
        toast('Your order has been placed. Expect delivery shortly.');
      }
    });
  }

  updateOrder(order) {
    const { updateOrder } = this.props;
    updateOrder(order).then((response) => {
      const { emptyCart } = this.props;
      if (response.status === 200) {
        this.resetFields();
        this.closeCheckoutForm();
        emptyCart();
        toast('Your order has been updated.');
      }
    });
  }

  placeOrder(e) {
    e.preventDefault();
    if (this.isValid()) {
      const { cart } = this.props;
      const order = this.processPayload();
      if (cart.updateMode) {
        this.updateOrder(order);
      } else {
        this.createOrder(order);
      }
    }
  }

  processPayload() {
    const { cart } = this.props;
    const meals = [];
    cart.cart.forEach((meal) => {
      meals.push({
        mealId: meal.id,
        price: meal.price,
        units: meal.units,
      });
    });
    const payload = {
      id: cart.orderId,
      contact: this.state.telephone,
      address: this.state.address,
      meals,
    };
    return payload;
  }

  resetFields() {
    this.setState({ telephone: '', address: '' });
  }

  renderCart() {
    const { cart } = this.props;
    return (
      <CartSidePane
        isOpen={cart.isOpen}
        closeCartPane={() => this.showCart(false)}
        cart={cart}
        updateUnits={this.updateUnits}
        checkout={this.showCheckoutForm}
        removeFromCart={this.removeFromCart}
        totalPrice={numberWithCommas(this.state.totalPrice)}
        emptyCart={this.props.emptyCart}
      />
    );
  }

  renderFormBody() {
    const { orders, formState } = this.props;
    return (
      <div>
        <div className="col-12">
          <a onClick={this.closeCheckoutForm} style={{ float: 'right' }}><i style={{ fontSize: 25 }} className="material-icons">close</i></a>
        </div>
        <div className="box">
          <div className="show-errors">
            <ul>
              {Object.keys(this.state.errors)
                .map(item => <li key={item}>{this.state.errors[item]}</li>)}
              {empty(orders.errors) ? '' :
                Object.keys(orders.errors).map(item => <li key={item}>{orders.errors[item]}</li>)}
            </ul>
          </div>
          <form onSubmit={this.placeOrder}>
            <BasicInput type="text" label="Phone Number" name="telephone" value={this.state.telephone} onChange={this.onChange} hasError={this.state.errors.telephone !== undefined} />
            <TextArea name="address" type="text" label="Address" value={this.state.address} onChange={this.onChange} hasError={this.state.errors.address !== undefined} />
            <SubmitButton value={this.state.updateMode ? 'Update' : 'Submit'} isLoading={formState.isLoading} />
          </form>
        </div>
      </div>
    );
  }

  renderCheckoutForm() {
    return (
      <Modal
        isOpen={this.state.showCheckoutModal}
        closeTimeoutMS={1}
        onAfterOpen={this.afterOpenModal}
        style={addProfileImageModalView}
        shouldCloseOnEsc
        shouldCloseOnOverlayClick
        onRequestClose={this.closeCheckoutForm}
        contentLabel="Modal"
      >
        {this.renderFormBody()}
      </Modal>
    );
  }

  renderFixedCart() {
    const { cart } = this.props;
    return (
      <div className={cart.cart.length ? 'dynamic-badge cart-control' : 'cart-control'} data-badge={cart.cart.length}>
        <i className="ion-ios-cart-outline" onClick={() => this.showCart(true)} />
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderCheckoutForm()}
        {this.renderFixedCart()}
        {this.renderCart()}
      </div>
    );
  }
}

Cart.propTypes = {
  emptyCart: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  orders: PropTypes.object.isRequired,
  formState: PropTypes.object.isRequired,
  deleteFromCart: PropTypes.func.isRequired,
  updateOrder: PropTypes.func.isRequired,
  updateCart: PropTypes.func.isRequired,
  setCartState: PropTypes.func.isRequired,
  postOrder: PropTypes.func.isRequired,
};

export default Cart;

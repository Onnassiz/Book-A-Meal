import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import empty from 'is-empty';
import CartItem from './partials/CartItem';
import { addProfileImageModalView } from './../../utilities/modalStyles';
import { BasicInput, TextArea } from './form/BasicInput';
import validateOrder from '../../utilities/validateOrder';
import SubmitButton from '../presentation/form/SubmitButton';
import { numberWithCommas } from '../../utilities/functions';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPrice: 0,
      telephone: '',
      address: '',
      showModal: false,
      errors: {},
    };
    this.updateUnits = this.updateUnits.bind(this);
    this.deleteMeal = this.deleteMeal.bind(this);
    this.toggleOrderModal = this.toggleOrderModal.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    this.calculateTotalPrice();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  calculateTotalPrice() {
    const $this = this;
    setTimeout(() => {
      const { cart } = this.props;
      let totalPrice = 0;
      cart.cart.forEach((meal) => {
        totalPrice += meal.totalPrice;
      });
      $this.setState({ totalPrice });
    }, 300);
  }

  toggleOrderModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  placeOrder(e) {
    e.preventDefault();
    if (this.isValid()) {
      const { postOrder } = this.props;
      const order = this.processPayload();

      postOrder(order).then((response) => {
        const { history, emptyCart } = this.props;
        if (response.status === 201) {
          this.toggleOrderModal();
          emptyCart();
          history.push('/menus');
        }
      });
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
        menuId: meal.menuId,
        profileId: meal.profileId,
      });
    });
    const payload = {
      contact: this.state.telephone,
      address: this.state.address,
      meals,
    };
    return payload;
  }

  isValid() {
    this.setState({ errors: {} });
    const { errors, isValid } = validateOrder(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  updateUnits(e, currentMeal) {
    const { value } = e.target;
    if (value > 0) {
      const { updateCart } = this.props;
      const meal = currentMeal;
      meal.units = parseInt(value, 10);
      meal.totalPrice = value * meal.price;
      updateCart(meal);
      this.calculateTotalPrice();
    }
  }

  deleteMeal(id) {
    const { deleteFromCart } = this.props;
    deleteFromCart(id);
    this.calculateTotalPrice();
  }


  render() {
    const { cart, formState, orders } = this.props;
    const closeModalStyle = {
      float: 'right',
    };
    return (
			<div id="content-body">
				{ cart.cart.length ?
					<div>
						<div>
							<Modal
								isOpen={this.state.showModal}
								closeTimeoutMS={1}
								style={addProfileImageModalView}
								ariaHideApp={false}
                contentLabel="Modal"
                className="image-upload"
							>
								<div>
                  <div className="col-12">
                    <a onClick={this.toggleOrderModal} style={closeModalStyle}><i style={{ fontSize: 25 }} className="material-icons">close</i></a>
                  </div>
                  <div className="box">
                    <div className="show-errors">
                      <ul>
                        {Object.keys(this.state.errors).map(item => <li key={item}>{ this.state.errors[item] }</li>)}
                        {empty(orders.errors) ? '' : Object.keys(orders.errors).map(item => <li key={item}>{ orders.errors[item] }</li>)}
                      </ul>
                    </div>
                  <form onSubmit={this.placeOrder}>
                    <BasicInput type="text" label="Phone Number" name="telephone" value={this.state.telephone} onChange={this.onChange} hasError={this.state.errors.telephone !== undefined} />
                    <TextArea name="address" type="text" label="Address" value={this.state.address} onChange={this.onChange} hasError={this.state.errors.address !== undefined} />
                    <SubmitButton value={this.state.updateMode ? 'Update' : 'Submit'} isLoading={formState.isLoading} />
                  </form>
                  </div>
								</div>
							</Modal>
						</div>
						<div className="col-9">
							{ cart.cart.map(meal => <CartItem deleteFromCart={() => this.deleteMeal(meal.id)} meal={meal} key={meal.id + meal.caterer} updateUnits={e => this.updateUnits(e, meal)} />) }
						</div>
						<div className="col-3">
							<div id="cart_summary">
								<h2>Order Summary</h2>
								<div className="cart_summary_body">
									<p className="num">Number of Items: { cart.cart.length }</p>
									<p className="num">Delivery Fee: &#8358;0.00</p>
									<p className="num">Discount: &#8358;0.00</p>
									<br />
									<br />
									<p className="num">Total Amount: <b>&#8358;{numberWithCommas(this.state.totalPrice)}.00</b></p>
									<br />
									<p><button onClick={this.toggleOrderModal}>Checkout</button></p>
								</div>
							</div>
						</div>
					</div> :
					<div id="no-menu">
						<h2>You have not added any meals to the cart.</h2>
					</div> }
			</div>
    );
  }
}

Cart.propTypes = {
  cart: PropTypes.object.isRequired,
  orders: PropTypes.object.isRequired,
  history: PropTypes.func.isRequired,
  emptyCart: PropTypes.func.isRequired,
  updateCart: PropTypes.func.isRequired,
  postOrder: PropTypes.func.isRequired,
  formState: PropTypes.object.isRequired,
  deleteFromCart: PropTypes.func.isRequired,
};

export default Cart;

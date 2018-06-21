import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import CartItem from './partials/CartItem';
import loaderImage from '../../../assets/images/loader.gif';
import { deleteModalStyle } from './../../utilities/modalStyles';

class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			totalPrice: 0,
			showModal: false,
		};
		this.updateUnits = this.updateUnits.bind(this);
		this.deleteMeal = this.deleteMeal.bind(this);
		this.toggleOrderModal = this.toggleOrderModal.bind(this);
		this.placeOrder = this.placeOrder.bind(this);
	}

	componentWillMount() {
		this.calculateTotalPrice();
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

	processPayload() {
		const { user, cart } = this.props;
		const meals = [];
		cart.cart.forEach((meal) => {
			meals.push({
				mealId: meal.id,
				price: meal.price,
				units: meal.units,
				profileId: meal.profileId,
			});
		});
		const payload = {
			userId: user.id,
			meals,
		};
		return payload;
	}

	placeOrder() {
		const payload = this.processPayload();
		console.log(payload);
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
		const { cart, formState } = this.props;
		return (
			<div id="content2">
				{ cart.cart.length ?
					<div>
						<div>
							<Modal
								isOpen={this.state.showModal}
								closeTimeoutMS={1}
								style={deleteModalStyle}
								ariaHideApp={false}
								contentLabel="Modal"
							>
								<div>
									<p style={{ margin: 5 }}>Are you sure you want to place this order?</p>
									<br />
									<p>
										<button onClick={this.toggleOrderModal} className="button-default">Close</button>
										<button onClick={this.placeOrder} style={{ float: 'right' }} className="button-default" disabled={formState.isLoading}>Place Order</button>
										<img style={{ float: 'right', marginTop: 13 }} src={loaderImage} alt="loader" hidden={!formState.isLoading} />
									</p>
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
									<p className="num">Total Amount: <b>&#8358;{this.state.totalPrice}.00</b></p>
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
	user: PropTypes.object.isRequired,
	cart: PropTypes.object.isRequired,
	updateCart: PropTypes.func.isRequired,
	formState: PropTypes.object.isRequired,
	deleteFromCart: PropTypes.func.isRequired,
};

export default Cart;

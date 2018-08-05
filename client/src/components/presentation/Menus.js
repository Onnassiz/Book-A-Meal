/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import Pagination from 'react-js-pagination';
import SlidingPane from 'react-sliding-pane';
import empty from 'is-empty';
import moment from 'moment';
import Calendar from 'rc-calendar';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import 'rc-calendar/assets/index.css';
import Alert from '../presentation/partials/Alert';
import CartItem from './partials/CartItem';
import { convertUnixToDateForUpdate, getDateFromMoment, numberWithCommas } from '../../utilities/functions';
import Card from './partials/MealCard';

class Menus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mealsCount: 0,
      activePage: 1,
      totalPrice: 0,
      isPaneOpenLeft: false,
      isPaneOpenLeftCart: false,
      meals: [],
      date: props.menus.currentDate,
    };
    this.onChange = this.onChange.bind(this);
    this.updateUnits = this.updateUnits.bind(this);
    this.getMenuForDate = this.getMenuForDate.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.showMore = this.showMore.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.showCalender = this.showCalender.bind(this);
    this.handDateChange = this.handDateChange.bind(this);
    this.showCart = this.showCart.bind(this);
  }

  componentWillMount() {
    const { getMealsInDailyMenu } = this.props;
    getMealsInDailyMenu(this.state.date).then((response) => {
      if (response.status === 200) {
        this.setState({ mealsCount: response.data.count, meals: response.data.meals });
        this.calculateTotalPrice();
      }
    });
  }

  onChange(e) {
    const { getMealsInDailyMenu } = this.props;
    let date = new Date(e.target.value);
    date = convertUnixToDateForUpdate(date.setDate(date.getDate()) / 1000);
    getMealsInDailyMenu(date).then(() => {
      this.setState({ date });
    }).catch(() => {
      this.setState({ date });
    });
  }

  getMenuForDate(number) {
    const { getMealsInDailyMenu } = this.props;
    let date = new Date(this.state.date);
    date = convertUnixToDateForUpdate(date.setDate(date.getDate() + number) / 1000);
    getMealsInDailyMenu(date).then((response) => {
      if (response.status === 200) {
        this.setState({ date, mealsCount: response.data.count, meals: response.data.meals, activePage: 1 });
      }
    });
  }

  addToCart(meal) {
    const { addToCart } = this.props;
    addToCart(meal);
  }

  removeFromCart(mealId) {
    const { deleteFromCart } = this.props;
    deleteFromCart(mealId);
  }

  showMore(meal) {
    const details = document.createElement('div');
    details.className = 'meal-details';
    details.innerHTML = `<h2>Name</h2><p>${meal.name}</p><h2>Description</h2><p>${meal.description}</p><h2>Category</h2><p>${meal.category}</p><h2>Catering Service</h2><p>${meal.caterer}</p>`;
    swal({
      title: 'Details',
      content: details,
    });
  }

  handlePageChange(pageNumber) {
    const { getMealsInDailyMenu } = this.props;
    const offset = (pageNumber - 1) * 12;
    getMealsInDailyMenu(this.state.date, offset, 12).then((response) => {
      if (response.status === 200) {
        this.setState({ activePage: pageNumber, meals: response.data.meals, mealsCount: response.data.count });
      }
    });
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

  showCart() {
    this.setState({ isPaneOpenLeftCart: true });
  }

  showCalender() {
    this.setState({ isPaneOpenLeft: true });
  }

  handDateChange(date) {
    const { getMealsInDailyMenu } = this.props;
    const selectedDate = getDateFromMoment(date._d);
    getMealsInDailyMenu(selectedDate).then((response) => {
      if (response.status === 200) {
        this.setState({ date: selectedDate, mealsCount: response.data.count, meals: response.data.meals, activePage: 1 });
      }
    });
  }

  render() {
    const { menus, cart, orders } = this.props;

    const showPagination = (
      <div>{this.state.mealsCount > 12 ?
        <div style={{ textAlign: 'center' }}>
          <Pagination
            hideDisabled
            activePage={this.state.activePage}
            itemsCountPerPage={12}
            totalItemsCount={this.state.mealsCount}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
          />
        </div> : ''}
      </div>
    );

    return (
      <div id="content-body">
        <SlidingPane
          isOpen={this.state.isPaneOpenLeft}
          title="Pick a Date"
          from="left"
          width="320px"
          onRequestClose={() => this.setState({ isPaneOpenLeft: false })}
        >
          <div>
            <Calendar
              showDateInput={false}
              value={moment(this.state.date)}
              onChange={this.handDateChange}
            />
          </div>
        </SlidingPane>

        <SlidingPane
          isOpen={this.state.isPaneOpenLeftCart}
          title="Cart Info"
          from="left"
          width="320px"
          onRequestClose={() => this.setState({ isPaneOpenLeftCart: false })}
        >
          <div>
            <div>
              {empty(cart.cart) ?
                <div id="empty-cart">
                  <h2>Your cart is empty</h2>
                </div> : cart.cart.map(meal => <CartItem deleteFromCart={() => this.removeFromCart(meal.id)} meal={meal} key={meal.id + meal.caterer} updateUnits={e => this.updateUnits(e, meal)} />)}
            </div>
            <div className="checkout">
              {empty(cart.cart) ? '' :
                <div>
                  <div className="cart_summary_body">
                    <h2>Order Summary</h2>
                    <p className="num">Number of Items: {cart.cart.length}</p>
                    <p className="num">Delivery Fee: &#8358;0.00</p>
                    <p className="num">Discount: &#8358;0.00</p>
                    <br />
                    <br />
                    <p className="num">Total Amount: <b>&#8358;{numberWithCommas(this.state.totalPrice)}.00</b></p>
                    <br />
                    <p><button onClick={this.props.emptyCart}>Empty Cart</button><button onClick={this.toggleOrderModal}>Checkout</button></p>
                  </div>
                </div>}
            </div>
          </div>
        </SlidingPane>

        <div className="control">
          <i className="ion-ios-calendar-outline" onClick={this.showCalender} />
        </div>
        <div className={cart.cart.length ? 'dynamic-badge cart-control' : 'cart-control'} data-badge={cart.cart.length}>
          <i className="ion-ios-cart-outline" onClick={this.showCart} />
        </div>
        <div className="col-12">
          {empty(orders.alert) ? '' : <Alert alert={orders.alert} />}
          <div className="dateInput">
            <a onClick={() => this.getMenuForDate(-1)} title="back"><i className="ion-ios-skipbackward" /> Previous</a>
            {/* <input autoComplete="off" type="date" name="date" onChange={this.onChange} value={this.state.date} required="" id="date" /> */}
            <a onClick={() => this.getMenuForDate(1)} title="next day">Next Day <i className="ion-ios-skipforward" /></a>
            <h2>{new Date(this.state.date).toDateString()}</h2>
          </div>
          <div id="card_container">
            {empty(this.state.meals) ?
              <div id="no-menu">
                <h2>No menu has been set for this day</h2>
              </div> : this.state.meals.map(meal => <Card showMore={() => this.showMore(meal)} cart={cart.cart} addToCart={() => this.addToCart(meal)} meal={meal} key={meal.id + meal.caterer} currentDate={menus.currentDate} removeFromCart={() => this.removeFromCart(meal.id)} />)}
          </div>
        </div>
        {showPagination}
      </div>
    );
  }
}

Menus.propTypes = {
  orders: PropTypes.object.isRequired,
  menus: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
  getMealsInDailyMenu: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  emptyCart: PropTypes.func.isRequired,
  updateCart: PropTypes.func.isRequired,
  deleteFromCart: PropTypes.func.isRequired,
};
export default Menus;


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
import { convertUnixToDateForUpdate, getDateFromMoment, numberWithCommas } from '../../utilities/functions';
import Card from './partials/MealCard';
import CartSidePane from './partials/CartSidePane';

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
    this.closeCartPane = this.closeCartPane.bind(this);
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

  componentDidMount() {
    document.title = 'Menus - Just Eat';
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
        this.setState({
          date, mealsCount: response.data.count, meals: response.data.meals, activePage: 1,
        });
      }
    });
  }

  addToCart(meal) {
    const { addToCart, user } = this.props;
    this.calculateTotalPrice();
    addToCart(meal, user.id);
  }

  removeFromCart(mealId) {
    const { deleteFromCart, user } = this.props;
    this.calculateTotalPrice();
    deleteFromCart(mealId, user.id);
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
        this.setState({
          activePage: pageNumber,
          meals: response.data.meals,
          mealsCount: response.data.count,
        });
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
      const { updateCart, user } = this.props;
      const meal = currentMeal;
      meal.units = parseInt(value, 10);
      meal.totalPrice = value * meal.price;
      updateCart(meal, user.id);
      this.calculateTotalPrice();
    }
  }

  showCart() {
    this.setState({ isPaneOpenLeftCart: true });
  }

  showCalender() {
    this.setState({ isPaneOpenLeft: true });
  }

  closeCartPane() {
    this.setState({ isPaneOpenLeftCart: false });
  }

  handDateChange(date) {
    const { getMealsInDailyMenu } = this.props;
    const selectedDate = getDateFromMoment(date._d);
    getMealsInDailyMenu(selectedDate).then((response) => {
      if (response.status === 200) {
        this.setState({
          date: selectedDate,
          mealsCount: response.data.count,
          meals: response.data.meals,
          activePage: 1,
        });
      }
    });
  }

  renderCalender() {
    return (
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
    );
  }

  renderPagination() {
    return (
      <div>{this.state.mealsCount > 12 ?
        <div style={{ textAlign: 'center' }}>
          <Pagination
            hideDisabled
            activePage={this.state.activePage}
            totalItemsCount={this.state.mealsCount}
            itemsCountPerPage={12}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
          />
        </div> : ''}
      </div>
    );
  }

  renderCart() {
    const { cart } = this.props;
    return (
      <CartSidePane
        isOpen={this.state.isPaneOpenLeftCart}
        closeCartPane={this.closeCartPane}
        cart={cart.cart}
        removeFromCart={this.removeFromCart}
        totalPrice={numberWithCommas(this.state.totalPrice)}
        emptyCart={this.props.emptyCart}
      />
    );
  }

  renderCard(meal) {
    const { cart, menus } = this.props;
    return (
      <Card
        showMore={() => this.showMore(meal)}
        cart={cart.cart}
        addToCart={() => this.addToCart(meal)}
        meal={meal}
        key={meal.id + meal.caterer}
        currentDate={menus.currentDate}
        removeFromCart={() => this.removeFromCart(meal.id)}
      />
    );
  }

  renderMeals() {
    const { orders } = this.props;
    return (
      <div className="col-12">
        {empty(orders.alert) ? '' : <Alert alert={orders.alert} />}
        <div className="dateInput">
          <a onClick={() => this.getMenuForDate(-1)} title="back"><i className="ion-ios-skipbackward" /> Previous</a>
          <a onClick={() => this.getMenuForDate(1)} title="next day">Next Day <i className="ion-ios-skipforward" /></a>
          <h2>{new Date(this.state.date).toDateString()}</h2>
        </div>
        <div id="card_container">
          {empty(this.state.meals) ?
            <div id="no-menu">
              <h2>No menu has been set for this day</h2>
            </div> : this.state.meals.map(meal => this.renderCard(meal))}
        </div>
      </div>
    );
  }

  render() {
    const { cart } = this.props;

    return (
      <div id="content-body">
        {this.renderCalender()}
        {this.renderCart()}
        {this.renderMeals()}

        <div className="control">
          <i className="ion-ios-calendar-outline" onClick={this.showCalender} />
        </div>
        <div className={cart.cart.length ? 'dynamic-badge cart-control' : 'cart-control'} data-badge={cart.cart.length}>
          <i className="ion-ios-cart-outline" onClick={this.showCart} />
        </div>

        {this.renderPagination()}
      </div>
    );
  }
}

Menus.propTypes = {
  orders: PropTypes.object.isRequired,
  menus: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getMealsInDailyMenu: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  emptyCart: PropTypes.func.isRequired,
  updateCart: PropTypes.func.isRequired,
  deleteFromCart: PropTypes.func.isRequired,
};
export default Menus;


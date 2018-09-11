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
import { convertUnixToDateForUpdate } from '../../utilities/functions';
import { getMenuForDate, registerMethods, handlePageChange, handleDateChange } from '../../utilities/menusHelpers';
import Card from './partials/MealCard';

class Menus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mealsCount: 0,
      activePage: 1,
      isPaneOpenLeft: false,
      meals: [],
      date: props.menus.currentDate,
    };
    registerMethods(this);
  }

  componentDidMount() {
    document.title = 'Menus - Just Eat';
    const { getMealsInDailyMenu } = this.props;
    getMealsInDailyMenu(this.state.date).then((response) => {
      if (response.status === 200) {
        this.setState({ mealsCount: response.data.count, meals: response.data.meals });
      }
    });
  }

  onChange(e) {
    const { getMealsInDailyMenu } = this.props;
    let date = new Date(e.target.value);
    date = convertUnixToDateForUpdate(date.setDate(date.getDate()) / 1000);
    return getMealsInDailyMenu(date).then(() => {
      this.setState({ date });
    });
  }

  handleDateChange(date) {
    handleDateChange(date || moment(new Date()), this);
  }

  handlePageChange(number) {
    handlePageChange(number, this);
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

  showCalender() {
    this.setState({ isPaneOpenLeft: true });
  }

  addToCart(meal) {
    const { addToCart, user } = this.props;
    addToCart(meal, user.id);
  }

  removeFromCart(mealId) {
    const { deleteFromCart, user } = this.props;
    deleteFromCart(mealId, user.id);
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
            onChange={date => this.handleDateChange(date)}
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
            onChange={number => this.handlePageChange(number)}
          />
        </div> : ''}
      </div>
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
    return (
      <div className="col-12">
        <div className="dateInput">
          <a onClick={() => getMenuForDate(-1, this)} title="back"><i className="ion-ios-skipbackward" /> Previous</a>
          <a onClick={() => getMenuForDate(1, this)} title="next day">Next Day <i className="ion-ios-skipforward" /></a>
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

  renderFixedCalender() {
    return (
      <div>
        <div className="control">
          <i className="ion-ios-calendar-outline" onClick={this.showCalender} />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div id="content-body">
        {this.renderFixedCalender()}
        {this.renderCalender()}
        {this.renderMeals()}
        {this.renderPagination()}
      </div>
    );
  }
}

Menus.propTypes = {
  menus: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
  getMealsInDailyMenu: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  deleteFromCart: PropTypes.func.isRequired,
};
export default Menus;

